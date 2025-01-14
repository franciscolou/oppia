// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controller for upload activity modal.
 */

import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertsService} from 'services/alerts.service';

interface ExplorationObj {
  yamlFile: File | null;
}

@Component({
  selector: 'upload-activity-modal',
  templateUrl: './upload-activity-modal.component.html',
})
export class UploadActivityModalComponent {
  selectedFile: File | null = null;

  constructor(
    private alertsService: AlertsService,
    private activeModal: NgbActiveModal
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  save(): void {
    if (!this.selectedFile || !this.selectedFile.size) {
      this.alertsService.addWarning('Empty file detected.');
      return;
    }
    const returnObj: ExplorationObj = {
      yamlFile: this.selectedFile,
    };
    this.activeModal.close(returnObj);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}

