import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: string;

  get icon(): IconProp | undefined {
    return this.iconName ? (['fas', this.iconName] as IconProp) : undefined;
  }

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}