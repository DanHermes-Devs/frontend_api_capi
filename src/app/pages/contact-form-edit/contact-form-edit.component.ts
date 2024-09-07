import { Component } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../core/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../core/services/email.service';
import { PhoneService } from '../../core/services/phone.service';
import { AddressService } from '../../core/services/address.service';

@Component({
  selector: 'app-contact-form-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form-edit.component.html',
  styleUrl: './contact-form-edit.component.css'
})
export class ContactFormEditComponent {
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
    private emailService: EmailService,
    private phoneService: PhoneService,
    private addressService: AddressService,
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

  removeEmailContact(id: number): void {
    this.emailService.deleteEmailContact(id).subscribe(() => {
      this.contact.emails = this.contact.emails.filter(email => email.id !== id);
    });
  }

  removePhoneContact(id: number): void {
    this.phoneService.deletePhoneContact(id).subscribe(() => {
      this.contact.phones = this.contact.phones.filter(phone => phone.id !== id);
    });
  }

  removeAddressContact(id: number): void {
    this.addressService.deleteAddressContact(id).subscribe(() => {
      this.contact.addresses = this.contact.addresses.filter(address => address.id !== id);
    });
  }

  // Métodos para agregar y eliminar emails
  addEmail(): void {
    if (this.newEmail && this.validateEmail(this.newEmail)) {
      let data = {
        email: this.newEmail,
        id: 0,
        contact_id: this.contact.id || 0,
        created_at: '',
        updated_at: ''
      };

      this.emailService.createEmailContact(data).subscribe(email => {
        this.loadContactData(this.contact.id);
      })

      this.newEmail = '';
    } else {
      alert('Please enter a valid email.');
    }
  }

  // Métodos para agregar y eliminar teléfonos
  addPhone(): void {
    if (this.newPhone) {
      let data = {
        phone_number: this.newPhone,
        id: 0,
        contact_id: this.contact.id || 0,
        created_at: '',
        updated_at: ''
      };

      this.phoneService.createPhoneContact(data).subscribe(phone => {
        this.loadContactData(this.contact.id);
      });

      this.newPhone = '';
    } else {
      alert('Please enter a valid phone number.');
    }
  }

  // Métodos para agregar y eliminar direcciones
  addAddress(): void {
    if (this.newAddress && this.newCity && this.newPostalCode) {
      let data = {
        address_line: this.newAddress,
        city: this.newCity,
        postal_code: this.newPostalCode,
        id: 0,
        contact_id: this.contact.id || 0,
        created_at: '',
        updated_at: ''
      };

      this.addressService.createAddressContact(data).subscribe(address => {
        this.loadContactData(this.contact.id);
      });

      this.newAddress = '';  // Limpiar campo
      this.newCity = '';     // Limpiar campo
      this.newPostalCode = '';  // Limpiar campo
    } else {
      alert('Please enter a valid address, city, and postal code.');
    }
  }

  // Validación del email
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    return emailPattern.test(email);
  }

  // Guardar el contacto
  saveContact(): void {
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
