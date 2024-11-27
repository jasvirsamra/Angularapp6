import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(500)])
    ])
  ]
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  newCustomer = { id: null, name: '', email: '', phone: '', image: '' };
  isEditMode = false;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.apiService.getCustomers().subscribe((data: any[]) => {
      this.customers = data;
    });
  }

  addOrUpdateCustomer(): void {
    if (this.isEditMode) {
      this.apiService.updateCustomer(this.newCustomer).subscribe((response: { message: any; }) => {
        alert(response.message);
        this.loadCustomers();
        this.resetForm();
      });
    } else {
      this.apiService.addCustomer(this.newCustomer).subscribe((response: { message: any; }) => {
        alert(response.message);
        this.loadCustomers();
        this.resetForm();
      });
    }
  }

  editCustomer(customer: any): void {
    this.newCustomer = { ...customer };
    this.isEditMode = true;
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.apiService.deleteCustomer(id).subscribe((response: { message: any; }) => {
        alert(response.message);
        this.loadCustomers();
      });
    }
  }

  resetForm(): void {
    this.newCustomer = { id: null, name: '', email: '', phone: '', image: '' };
    this.selectedImage = null;
    this.isEditMode = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.newCustomer.image = file.name; // Save image name
      };
      reader.readAsDataURL(file);
    }
  }
}
