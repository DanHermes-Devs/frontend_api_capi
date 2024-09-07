import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de que FormsModule esté importado
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../interfaces/contact';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],  // FormsModule es necesario para ngModel
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact: Contact = {
    id: 0,
    name: '',
    notes: '',
    birthday: '',
    website: '',
    company: '',
    created_at: '',
    updated_at: '',
    addresses: [],  // Para almacenar las direcciones
    emails: [],  // Para almacenar los emails
    phones: []   // Para almacenar los teléfonos
  };

  newEmail: string = '';  // Para agregar emails
  newPhone: string = '';  // Para agregar teléfonos
  newAddress: string = '';  // Para agregar direcciones
  newCity: string = '';     // Para agregar ciudad en las direcciones
  newPostalCode: string = '';  // Para agregar código postal

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.params['id'];
    if (contactId) {
      this.loadContactData(contactId);
    }
  }

  loadContactData(contactId: number): void {
    this.contactService.getContactById(contactId).subscribe(contact => {
      this.contact = contact;
    });
  }

  // Métodos para agregar y eliminar emails
  addEmail(): void {
    if (this.newEmail && this.validateEmail(this.newEmail)) {
      this.contact.emails.push({
        email: this.newEmail,
        id: 0,  // Valor predeterminado para id
        contact_id: this.contact.id || 0,  // Valor predeterminado para contact_id
        created_at: '',  // Valor predeterminado para created_at
        updated_at: ''   // Valor predeterminado para updated_at
      });
      this.newEmail = '';  // Limpiar campo
    } else {
      alert('Please enter a valid email.');
    }
  }


  removeEmail(index: number): void {
    this.contact.emails.splice(index, 1);
  }

  // Métodos para agregar y eliminar teléfonos
  addPhone(): void {
    if (this.newPhone) {
      this.contact.phones.push({
        phone_number: this.newPhone,  // Usar el nombre correcto de la propiedad
        id: 0,  // Valor predeterminado para id
        contact_id: this.contact.id || 0,  // Valor predeterminado para contact_id
        created_at: '',  // Valor predeterminado para created_at
        updated_at: ''   // Valor predeterminado para updated_at
      });
      this.newPhone = '';  // Limpiar campo
    } else {
      alert('Please enter a valid phone number.');
    }
  }


  removePhone(index: number): void {
    this.contact.phones.splice(index, 1);
  }

  // Métodos para agregar y eliminar direcciones
  addAddress(): void {
    if (this.newAddress && this.newCity && this.newPostalCode) {
      this.contact.addresses.push({
        address_line: this.newAddress,
        city: this.newCity,
        postal_code: this.newPostalCode,
        id: 0,  // Valor predeterminado para id
        contact_id: this.contact.id || 0,  // Valor predeterminado para contact_id
        created_at: '',  // Valor predeterminado para created_at
        updated_at: ''   // Valor predeterminado para updated_at
      });
      this.newAddress = '';  // Limpiar campo
      this.newCity = '';     // Limpiar campo
      this.newPostalCode = '';  // Limpiar campo
    } else {
      alert('Please enter a valid address, city, and postal code.');
    }
  }


  removeAddress(index: number): void {
    this.contact.addresses.splice(index, 1);
  }

  // Validación del email
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    return emailPattern.test(email);
  }

  // Guardar el contacto
  saveContact(): void {
    // console.log(this.contact);
    const contactPayload = {
      id: this.contact.id,  // Asegurar que el id se envía correctamente
      name: this.contact.name,
      notes: this.contact.notes,
      birthday: this.contact.birthday,
      website: this.contact.website,
      company: this.contact.company,
      emails: this.contact.emails.map(email => ({
        email: email.email,
        id: email.id || 0,  // Valor predeterminado si no está presente
        contact_id: this.contact.id || 0,  // Asegurar el contact_id adecuado
        created_at: email.created_at || '',  // Valor predeterminado si está vacío
        updated_at: email.updated_at || ''   // Valor predeterminado si está vacío
      })),
      phones: this.contact.phones.map(phone => ({
        phone_number: phone.phone_number,
        id: phone.id || 0,  // Valor predeterminado si no está presente
        contact_id: this.contact.id || 0,  // Asegurar el contact_id adecuado
        created_at: phone.created_at || '',  // Valor predeterminado si está vacío
        updated_at: phone.updated_at || ''   // Valor predeterminado si está vacío
      })),
      addresses: this.contact.addresses.map(address => ({
        address_line: address.address_line,
        city: address.city,
        postal_code: address.postal_code,
        id: address.id || 0,  // Valor predeterminado si no está presente
        contact_id: this.contact.id || 0,  // Asegurar el contact_id adecuado
        created_at: address.created_at || '',  // Valor predeterminado si está vacío
        updated_at: address.updated_at || ''   // Valor predeterminado si está vacío
      })),
      created_at: this.contact.created_at || '',  // Asignar valor predeterminado si está vacío
      updated_at: this.contact.updated_at || ''   // Asignar valor predeterminado si está vacío
    };

    if (this.contact.id) {
      // Actualizar contacto existente
      this.contactService.updateContact(contactPayload).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    } else {
      // Crear nuevo contacto
      this.contactService.createContact(contactPayload).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }
}
