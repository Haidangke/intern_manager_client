import { InternDetail } from './../../models/intern.model';
import { Component, Input } from '@angular/core';
import {
    faCakeCandles,
    faEnvelope,
    faLocationDot,
    faPhone,
    faSignature,
    faTransgender,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-info-intern',
    templateUrl: './info-intern.component.html',
    styleUrls: ['./info-intern.component.scss'],
})
export class InfoInternComponent {
    icons = {
        faSignature,
        faUsers,
        faTransgender,
        faPhone,
        faEnvelope,
        faLocationDot,
        faCakeCandles,
    };
    @Input() intern!: InternDetail;
}
