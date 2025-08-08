import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dog-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dog-form.component.html',
  styleUrl: './dog-form.component.scss',
})
export class DogFormComponent {
  loading = input<boolean>(false);
  dogAdded = output<{
    name: string;
    comment: string;
    breed: string;
    formData: FormData;
  }>();
  filename = '';
  private readonly fb = inject(FormBuilder);
  formGroup = this.fb.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    comment: ['', Validators.required],
  });
  private formData: FormData;

  setFormData(files: FileList): void {
    if (files[0]) {
      const formData = new FormData();
      formData.append(files[0].name, files[0]);
      this.filename = files[0].name;
      this.formData = formData;
    }
  }

  addDog(): void {
    if (this.formGroup.valid) {
      const { name, comment, breed } = this.formGroup.value;

      this.dogAdded.emit({
        name,
        comment,
        breed,
        formData: this.formData,
      });
    }
  }
}
