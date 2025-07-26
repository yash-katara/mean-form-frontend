import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  form = this.fb.group({
    fullName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    addressLine1: ['', [Validators.required, Validators.maxLength(100)]],
    addressLine2: ['', Validators.maxLength(100)],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: [
      '',
      [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,6}$/)],
    ],
    occupation: ['', Validators.required],
    annualIncome: [''],
    signature: ['', Validators.required],
  });

  // ✅ Inline type added to fix TS7053
  countryStateCity: {
    [country: string]: {
      [state: string]: string[];
    };
  } = {
    India: {
      Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
      Delhi: ['New Delhi', 'Noida', 'Gurgaon'],
      Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    },
    USA: {
      Texas: ['Houston', 'Austin', 'Dallas'],
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      NewYork: ['New York City', 'Buffalo', 'Rochester'],
    },
    Canada: {
      Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
      Quebec: ['Montreal', 'Quebec City', 'Laval'],
      BritishColumbia: ['Vancouver', 'Victoria', 'Kelowna'],
    },
  };

  countryList: string[] = [];
  states: string[] = [];
  cities: string[] = [];
  submitted = false;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  imageData: string | null = null;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryList = Object.keys(this.countryStateCity);
  }


  ngAfterViewInit() {
  const canvas = this.canvasRef.nativeElement;
  this.ctx = canvas.getContext('2d')!;
  canvas.addEventListener('mousedown', () => this.drawing = true);
  canvas.addEventListener('mouseup', () => this.drawing = false);
  canvas.addEventListener('mousemove', this.draw.bind(this));
}

draw(event: MouseEvent) {
  if (!this.drawing) return;
  const canvas = this.canvasRef.nativeElement;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  this.ctx.lineWidth = 2;
  this.ctx.lineCap = 'round';
  this.ctx.strokeStyle = 'black';
  this.ctx.lineTo(x, y);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.moveTo(x, y);
}



save() {
  this.imageData = this.canvasRef.nativeElement.toDataURL();
  this.form.get('signature')?.setValue(this.imageData); // ✅ push to form
}


clear() {
  const canvas = this.canvasRef.nativeElement;
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  this.imageData = null;
  this.form.get('signature')?.setValue('');
}


  onCountryChange() {
    const country = this.form.get('country')?.value;
    this.states = country ? Object.keys(this.countryStateCity[country]) : [];
    this.form.get('state')?.setValue('');
    this.cities = [];
  }

  onStateChange() {
    const country = this.form.get('country')?.value;
    const state = this.form.get('state')?.value ?? '';
    this.cities = country ? this.countryStateCity[country][state] || [] : [];
    this.form.get('city')?.setValue('');
  }

  captureSignature(event: any) {
    this.form.get('signature')?.setValue(event);
  }

  onSubmit() {

  this.submitted = true;
  //   console.log("Form Submitted:", this.form.value);
  // console.log("Form Valid:", this.form.valid);
    if (this.form.valid) {
      const formData = this.form.value;
    console.log("Form Submitted:", formData);
      this.userService.createUser(this.form.value as User).subscribe(() => {
        alert('Form submitted!');
        this.router.navigate(['/users']);
      });
    }
  }
}
