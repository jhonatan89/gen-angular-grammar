
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComboBoxUniversityComponent} from './search-combo-box-university/search-combo-box-university.component';
import { SearchComboBoxUniversityService } from './search-combo-box-university/search-combo-box-university.service'

@NgModule({
    imports: [
        NgbModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [PaginationComponent, SearchComboBoxUniversityComponent],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, PaginationComponent, SearchComboBoxUniversityComponent],
    providers: [SearchComboBoxUniversityService]
})
export class SharedModule { }