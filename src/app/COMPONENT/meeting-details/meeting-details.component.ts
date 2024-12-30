import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../SERVICE/auth.service';
import { MeetingService } from '../../SERVICE/meeting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface MeetingDetails {
  meetingId: string;
  ConductedDate: string;
  VerticalName: string;
  ConductedPerson: string;
  department: string;
  DeptHod: string;
  EmpCode: string;
  ActionPoint: string;
  TargetDate: string;
  MisCordinator: string;
<<<<<<< HEAD
  User_Remark: string;
  MIS_STATUS:string;
=======
  Remark: string;
  MIS_STATUS: string;
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
}


@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrl: './meeting-details.component.css'
})
export class MeetingDetailsComponent implements OnInit {

  // meetingId: any;
  // meetingDetails:MeetingDetails|undefined
  // meetingDetailsForm!: FormGroup;
  // userRole: string = '';
  // meetingSearchForm!: FormGroup;
  // originalRemark: string = '';
  // finalRemark: string[] = [
  //   'in-progress',
  //   'Resolved',
  //   'Rejected'
  // ]
  

  // constructor(private router: Router, private _fb: FormBuilder, private meetingService: MeetingService, private authService: AuthService,private toastr:ToastrService) { }

  // ngOnInit(): void {
  //   this.userRole = this.authService.getUserRole() || 'unknown';
  //   if (this.meetingId) {
  //     this.fetchMeetingDetails();
  //   }
  //   this.meetingDetailsForm = this._fb.group({
  //     meetingId: [''], // Prepopulated, not editable
  //     ConductedDate: [''], // Prepopulated, not editable
  //     VerticalName: [''], // Prepopulated, not editable
  //     ConductedPerson: [''], // Prepopulated, not editable
  //     department: [''], // Prepopulated, not editable
  //     DeptHod: [''], // Prepopulated, not editable
  //     EmpCode: [''], // Prepopulated, not editable
  //     ActionPoint: [''], // Prepopulated, not editable
  //     TargetDate: [''], // Prepopulated, not editable
  //     MisCordinator: [''], // Prepopulated, not editable
  //     finalRemark: ['in-progress', Validators.required],

  //   });
  //   this.meetingSearchForm = this._fb.group({
  //     meetingId: ['', Validators.required]
  //   })
  // }

  // fetchMeetingDetails() {
  //   this.meetingService.getMeetingDetailsById(this.meetingId)
  //     .subscribe((response) => {
  //       if (response) {
  //         const meetingDetails: MeetingDetails = {
  //           meetingId: response[0],
  //           ConductedDate: response[1], // Assuming indices in response match interface properties
  //           VerticalName: response[2],
  //           ConductedPerson: response[3],
  //           department: response[4],
  //           DeptHod: response[5],
  //           EmpCode: response[6],
  //           ActionPoint: response[7],
  //           TargetDate: response[8],
  //           MisCordinator: response[9],
  //           Remark: response[10],
            
  //         };
  //         this.meetingDetails = meetingDetails;
  //         this.originalRemark = meetingDetails.Remark; // Store original remark
  //       } else {
  //         console.warn('No meeting details found for ID:', this.meetingId);
  //         // Handle case where no meeting is found (optional)
  //       }
  //     }, (error) => {
  //       console.error('Error fetching meeting details:', error);
  //       // Handle error (e.g., display error message to user)
  //     });
  // }
 
  
  // onSearchMeetingId() {
  //   if (this.meetingSearchForm.valid) {
  //     const meetingId = this.meetingSearchForm.get('meetingId')?.value;
  //     this.meetingId = meetingId;
  //     this.fetchMeetingDetails(); // Call fetchMeetingDetails with retrieved ID
  //     this.meetingDetailsForm.reset();
  //   }
  // }

  // // meeting-details.component.ts
  // onSubmit() {
  //   if (this.meetingDetailsForm.valid) {
  //     console.log('Form is valid');
  //     const originalRemark = this.originalRemark;
  //     const updatedRemark = this.meetingDetailsForm.get('finalRemark')?.value;
  //     const meetingId = this.meetingDetails?.meetingId; // Extract ID from fetched data
  //      const updatedBy = String(this.authService.getEmpCode() || ''); 
  //     if (!meetingId) {
  //       console.error('Meeting ID not available');
  //       return; // Handle missing ID error (optional)
  //     }

  //     if (originalRemark !== updatedRemark) {
  //       // Remark has changed, send entire form data to backend
  //       this.meetingService.updateMeetingRemark(meetingId, updatedRemark,updatedBy)
  //         .subscribe(response => {
  //           // Handle successful update (optional)
  //           console.log('Remark updated successfully');
  //           this.toastr.success("Remark updated successfully");
            
  //         }, error => {
  //           // Handle error during update (optional)
  //           console.error('Error updating remark:', error);
  //         });
  //     } else {
  //       // Remark hasn't changed (optional: inform user)
  //       console.log('Remark is unchanged.');
  //       this.toastr.warning("Remark is unchanged");
        
  //     }
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
  
  //updated code for including file upload download and Mis_status
  
  meetingId: any;
  meetingDetails: MeetingDetails | undefined;
  meetingDetailsForm!: FormGroup;
  userRole: string = '';
  meetingSearchForm!: FormGroup;
  meetingIdFound = new EventEmitter<string>(); // Define EventEmitter
  originalRemark: string = '';
  finalRemark: string[] = [
    'in-progress',
    'Resolved',
    'Rejected'
<<<<<<< HEAD
  ];
  uploadedFileUrl!: string;
  fileType!: string;
  file!: string;
  fileUrl!:string;
=======
  ]
  uploadedFileUrl!: string;
  fileType!: string;
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
  downloadFileUrl!: string;
  meetingFiles: any[] = [];
  uploadProgress = 0; // Upload progress indicator
  isUploading = false; // To show/hide progress bar
  uploadedFile!: File; 
  uploadedFileName!: string; // To store the original file name
  uploadedFileExtension!: string; // To store the file extension
 
<<<<<<< HEAD

  constructor(private router: Router, private _fb: FormBuilder, private meetingService: MeetingService, private authService: AuthService,private toastr:ToastrService) { }
=======
  
  

  constructor(private router: Router, private _fb: FormBuilder, private meetingService: MeetingService, private authService: AuthService, private route: ActivatedRoute,private toastr:ToastrService) { }
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf

  ngOnInit(): void {
    
    const roles = this.authService.getUserRole(); // this will return a string[] (array of roles)
  this.userRole = roles?.[0] || 'unknown'; 
    if (this.meetingId) {
      this.fetchMeetingDetails();
    }
    this.meetingDetailsForm = this._fb.group({
      meetingId: [''], // Prepopulated, not editable
      ConductedDate: [''], // Prepopulated, not editable
      VerticalName: [''], // Prepopulated, not editable
      ConductedPerson: [''], // Prepopulated, not editable
      department: [''], // Prepopulated, not editable
      DeptHod: [''], // Prepopulated, not editable
      EmpCode: [''], // Prepopulated, not editable
      ActionPoint: [''], // Prepopulated, not editable
      TargetDate: [''], // Prepopulated, not editable
      MisCordinator: [''], // Prepopulated, not editable
      MIS_STATUS:[''],
      finalRemark: ['', Validators.required],
    });
    this.meetingSearchForm = this._fb.group({
      meetingId: ['', Validators.required]
    })
  }
  fetchMeetingDetails() {
    this.meetingService.getMeetingDetailsById(this.meetingId)
      .subscribe((response: any[]) => {
        if (response) {
          const meetingDetails: MeetingDetails = {
            meetingId: response[0],
            ConductedDate: response[1], // Assuming indices in response match interface properties
            VerticalName: response[2],
            ConductedPerson: response[3],
            department: response[4],
            DeptHod: response[5],
            EmpCode: response[6],
            ActionPoint: response[7],
            TargetDate: response[8],
            MisCordinator: response[9],
<<<<<<< HEAD
            User_Remark: response[10],
            MIS_STATUS:response[16]
            
          };
          this.meetingDetails = meetingDetails;
          this.originalRemark = meetingDetails.User_Remark; // Store original remark
          //  this.fetchMeetingFiles(this.meetingId);
          // Populate the form with the fetched data
          //  this.fetchMeetingFiles(this.meetingId);
          this.meetingDetailsForm.patchValue({
            meetingId: meetingDetails.meetingId,
            ConductedDate: meetingDetails.ConductedDate,
            VerticalName: meetingDetails.VerticalName,
            ConductedPerson: meetingDetails.ConductedPerson,
            department: meetingDetails.department,
            DeptHod: meetingDetails.DeptHod,
            EmpCode: meetingDetails.EmpCode,
            ActionPoint: meetingDetails.ActionPoint,
            TargetDate: meetingDetails.TargetDate,
            MisCordinator: meetingDetails.MisCordinator,
            User_Remark: meetingDetails.User_Remark,
            MIS_STATUS: meetingDetails.MIS_STATUS
          });
          if(meetingDetails.User_Remark === 'Resolved'){
            //disable user remark field
            this.meetingDetailsForm.get('finalRemark')?.disable();
          }
         
        } else {
          console.warn('No meeting details found for ID:', this.meetingId);
          // Handle case where no meeting is found (optional)
          alert('No meeting details found for ID:')
=======
            Remark: response[10],
            MIS_STATUS: response[16]
            
          };
          this.meetingDetails = meetingDetails;
          this.originalRemark = meetingDetails.Remark; // Store original remark

         this.fetchMeetingFiles(this.meetingId);
        } else {
          console.warn('No meeting details found for ID:', this.meetingId);
          alert('No meeting details found');
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
        }
      }, (error: any) => {
        console.error('Error fetching meeting details:', error);
      });
  }
<<<<<<< HEAD
 
// fetchMeetingFiles(meetingId: string) {
//   this.meetingService.getMeetingFiles(meetingId).subscribe(
//     (files) => {
//       if (files && files.length > 0) {
//         this.meetingFiles = files.map(file => {
//           const baseUrl = 'https://vef.manappuram.com';  // Your backend base URL

//           // Ensure fileUrl is correctly formed
//           const fileUrl = file.fileUrl.startsWith('http') ? file.fileUrl : `${baseUrl}${file.fileUrl}`;
//           console.log('Raw fileUrl:', file.fileUrl); // Log the raw URL from the API
//           console.log('Formatted fileUrl:', fileUrl); // Log the final formatted URL
//           return {
//             ...file,
//             fileUrl,  // Correctly formatted URL
//             fileName: file.fileName,
//             fileType: file.fileType
//           };
//         });
//       } else {
//         this.toastr.warning('No files found for this meeting ID.');
//       }
//     },
//     (error) => {
//       this.toastr.error(error.message); // Display the extracted error message
//       console.error('Error fetching meeting files:', error);
      
//     }
//   );
// }
  onFileChange(event: any) {
    if (this.meetingDetails?.User_Remark === 'Resolved' || this.meetingDetails?.User_Remark === 'Rejected') {
      this.toastr.warning('Cannot upload files. Status is Resolved or Rejected.');
      return;
    }
  
    const file = event.target.files[0];
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/.jpg'];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Unsupported file format.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        this.toastr.error('File size should not exceed 2MB.');
        return;
      }
      this.uploadedFile = file; // Store the file
    this.fileType = file.type; // Store the file type

    // Extract and store the original file name and extension
    this.uploadedFileName = file.name.split('.').slice(0, -1).join('.');
    this.uploadedFileExtension = file.name.split('.').pop() || '';

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFileUrl = e.target.result;
        this.simulateUpload();  // Simulate the upload process here
      };
      reader.readAsDataURL(file);
    }

  } simulateUpload() {
    this.isUploading = true; // Show progress bar
    this.uploadProgress = 0;

    const interval = setInterval(() => {
      this.uploadProgress += 10;

      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false; // Hide progress bar when done
        this.toastr.success('File uploaded successfully!', 'Success');
      }
    }, 200); // Simulate the upload progress every 200ms
  }


  onViewFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }

  // downloadFile(fileUrl: string, fileName: string) {
  //   const link = document.createElement('a');
  //   link.href = fileUrl;
  //   link.download = fileName;
  //   link.click();
  // }
  
  downloadFile(fileUrl: string, fileName: string) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }
  

=======
  fetchMeetingFiles(meetingId: string) {
  this.meetingService.getMeetingFiles(meetingId)
    .subscribe((files: any[]) => {
      if (files && files.length > 0) {
        this.meetingFiles = files.map(file => ({
          ...file,
          fileUrl: `data:${file.fileType};base64,${file.fileData}`
        }));
        console.log('Fetched Files:', this.meetingFiles); // Log to check fetched files
      } else {
        console.warn('No files found for this meeting ID:', meetingId);
      }
    }, (error: any) => {
      console.error('Error fetching meeting files:', error);
    });
}


>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
  onSearchMeetingId() {
    if (this.meetingSearchForm.valid) {
      const meetingId = this.meetingSearchForm.get('meetingId')?.value;
      this.meetingId = meetingId;
      this.fetchMeetingDetails(); // Call fetchMeetingDetails with retrieved ID
      this.meetingDetailsForm.reset();
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/.jpg'];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Unsupported file format.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        this.toastr.error('File size should not exceed 2MB.');
        return;
      }
      this.uploadedFile = file; // Store the file
    this.fileType = file.type; // Store the file type

    // Extract and store the original file name and extension
    this.uploadedFileName = file.name.split('.').slice(0, -1).join('.');
    this.uploadedFileExtension = file.name.split('.').pop() || '';

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFileUrl = e.target.result;
        this.simulateUpload();  // Simulate the upload process here
      };
      reader.readAsDataURL(file);
    }

  } simulateUpload() {
    this.isUploading = true; // Show progress bar
    this.uploadProgress = 0;

    const interval = setInterval(() => {
      this.uploadProgress += 10;

      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false; // Hide progress bar when done
        this.toastr.success('File uploaded successfully!', 'Success');
      }
    }, 200); // Simulate the upload progress every 200ms
  }


  onViewFile(fileUrl: string) {
    window.open(this.uploadedFileUrl, '_blank');
  }

  downloadFile(fileUrl: string, fileName: string) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }

  onSubmit() {
    if (this.meetingDetails?.User_Remark === 'Resolved') {
      this.toastr.warning('Cannot update remarks. Status is already Resolved.');
      return;
    }
    if (this.meetingDetailsForm.valid) {
      console.log('Form is valid');

  
      const originalRemark = this.originalRemark;
      const updatedRemark = this.meetingDetailsForm.get('finalRemark')?.value;
      const meetingId = this.meetingDetails?.meetingId; // Extract ID from fetched data
<<<<<<< HEAD
      const updatedBy = String(this.authService.getEmpCode() || '');

=======
       const updatedBy = String(this.authService.getEmpCode() || '');
      
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
      if (!meetingId) {
        console.error('Meeting ID not available');
        return; // Handle missing ID error (optional)
      }
<<<<<<< HEAD

      if (originalRemark !== updatedRemark) {
        const formData = new FormData();
      if (this.uploadedFile) {
        formData.append('file', this.uploadedFile, this.uploadedFile.name);
      }
      formData.append('remark', updatedRemark);
      formData.append('meetingId', meetingId);
      formData.append('updatedBy', updatedBy); // Include `updatedBy`
        // Remark has changed, send entire form data to backend
        this.meetingService.updateMeetingRemark(meetingId, formData)
          .subscribe(response => {
            // Handle successful update (optional)
            console.log('Remark updated successfully');
            this.toastr.success("Remark updated successfully",'sucess')
            
          }, error => {
            // Handle error during update (optional)
            console.error('Error updating remark:', error);
          
            this.toastr.error("Error updated sucessfully")
=======
  
      if (originalRemark !== updatedRemark|| this.uploadedFile) {
        // Prepare FormData for file upload and remark update
        const formData = new FormData();
        if (this.uploadedFile) {
          formData.append('file', this.uploadedFile, this.uploadedFile.name);
        }
        formData.append('remark', updatedRemark);
        formData.append('meetingId', meetingId);
        
  
        // Call service to update remark and upload file if provided
        this.meetingService.updateMeetingRemark(meetingId,updatedRemark,updatedBy,formData)
          .subscribe(() => {
            // Only call toastr once
            if (!this.uploadProgress) {
              this.toastr.success("Remark and file updated successfully", 'Success');
            }
            
            console.log('Remark and file updated successfully');
            this.isUploading = false;
            this.meetingDetailsForm.reset();
          }, (error: any) => {
            // Only call toastr once
            if (!this.uploadProgress) {
              this.toastr.error("Error updating remark and file");
            }
            console.error('Error updating remark and file:', error);
            
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
          });
      } else {
        // Remark hasn't changed and no file uploaded
        this.toastr.info("User Final Remarks is still In-Progress status");
        console.log('Remark is unchanged.');
<<<<<<< HEAD
        alert("Remark is unchanged")
        this.toastr.warning("Remark is unchanged")
        this.meetingDetailsForm.reset();
        
=======
        this.meetingDetailsForm.reset();
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
      }
    } else {
      console.log('Form is invalid');
    }
  }

  // Helper method to convert dataURL to Blob
  dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  
}
