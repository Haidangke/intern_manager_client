import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    forwardRef,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-validation-error',
    templateUrl: './validation-error.component.html',
    styleUrls: ['./validation-error.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ValidationErrorComponent),
            multi: true,
        },
    ],
})
export class ValidationErrorComponent implements ControlValueAccessor {
    @Input() control!: any;
    errorMessage: string | null = null;
    subscription!: Subscription;
    ngOnInit() {
        this.subscription = this.control.valueChanges.subscribe(
            (status: any) => {
                this.updateErrorMessage(this.control.errors);
                console.log(this.control.errors);
            }
        );
    }
    get error(): any {
        return this.control.errors;
    }

    onChange: any = () => {};
    onTouch: any = () => {};

    writeValue(value: any): void {}

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {}

    updateErrorMessage(errors: any): void {
        // const errors = this.error;
        if (errors) {
            const firstKey = Object.keys(errors)[0];
            this.errorMessage = this.getErrorLabel(firstKey);
        } else {
            this.errorMessage = null;
        }
    }

    getErrorLabel(errorKey: string): string {
        // Tùy chỉnh cách hiển thị thông báo lỗi dựa trên errorKey
        switch (errorKey) {
            case 'required':
                return 'This field is required.';
            case 'email':
                return 'Invalid email format.';
            case 'minlength':
                return 'Minimum length is {requiredLength} characters.';
            // Thêm các errorKey và thông báo lỗi tương ứng tùy ý
            default:
                return 'Invalid value.';
        }
    }
}
