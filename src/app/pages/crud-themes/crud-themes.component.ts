import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Product, ProductService } from '../service/product.service';
import { Theme, ThemesService } from '@/shared/services/themes.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-crud-themes',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    templateUrl: './crud-themes.component.html',
    styleUrls: ['./crud-themes.component.scss'],
    providers: [MessageService, ProductService, ConfirmationService, ThemesService]
})
export class CrudThemesComponent implements OnInit {
    productDialog: boolean = false;

    themes = signal<Theme[]>([]);

    theme!: Theme;

    selectedThemes!: Theme[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private themesService: ThemesService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadData();
    }

    async loadData() {
        
        const data = await this.themesService.getThemes('limit=50');
        this.themes.set(data);

        this.cols = [
            { field: 'id', header: 'ID', customExportHeader: 'Theme ID' },
            { field: 'titles[0].title', header: 'Title' },
            { field: 'locales', header: 'Locales' },
            { field: 'templates_count', header: 'Templates' },
            { field: 'formats_count', header: 'Formats' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.theme = {
            titles: [],
            id: '',
            created_at: '',
            locales: [],
            templates_count: 0,
            formats_count: 0,
            is_featured: false
        };
        this.submitted = false;
        // this.themeDialog = true;
    }

    editTheme(theme: Theme) {
        this.theme = { ...theme };
        // this.themeDialog = true;
    }

    deleteSelectedThemes() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected themes?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.themes.set(this.themes().filter((val) => !this.selectedThemes?.includes(val)));
                this.selectedThemes = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Themes Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        // this.themeDialog = false;
        this.submitted = false;
    }

    deleteTheme(theme: Theme) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + theme.titles[0].title + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.themes.set(this.themes().filter((val) => val.id !== theme.id));
                this.theme = {
                    titles: [],
                    id: '',
                    created_at: '',
                    locales: [],
                    templates_count: 0,
                    formats_count: 0,
                    is_featured: false
                };
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Theme Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.themes().length; i++) {
            if (this.themes()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveTheme() {
        this.submitted = true;
        let _themes = this.themes();
        if (this.theme.titles[0].title?.trim()) {
            if (this.theme.id) {
                _themes[this.findIndexById(this.theme.id)] = this.theme;
                this.themes.set([..._themes]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Theme Updated',
                    life: 3000
                });
            } else {
                this.theme.id = this.createId();
                // this.theme.image = 'theme-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Theme Created',
                    life: 3000
                });
                this.themes.set([..._themes, this.theme]);
            }

            // this.themeDialog = false;
            this.theme = {
                titles: [],
                id: '',
                created_at: '',
                locales: [],
                templates_count: 0,
                formats_count: 0,
                is_featured: false
            };
        }
    }
} 