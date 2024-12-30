import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingService } from '../../SERVICE/meeting.service';
import { AuthService } from '../../SERVICE/auth.service';
import { ToastrService } from 'ngx-toastr';

<<<<<<< HEAD
=======

>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
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
  MIS_STATUS: string;
  
  
=======
  Remark: string;
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
}

@Component({
  selector: 'app-misupdate',
  templateUrl: './misupdate.component.html',
  styleUrl: './misupdate.component.css'
})
export class MISUPDATEComponent implements OnInit {
<<<<<<< HEAD
  meetingId: any;
=======

 meetingId: any;
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
  meetingDetails:MeetingDetails|undefined
  meetingDetailsForm!: FormGroup;
  userRole: string = '';
  meetingSearchForm!: FormGroup;
  originalRemark: string = '';
<<<<<<< HEAD
  uploadedFileUrl!: string;
  fileType!: string;
  downloadFileUrl!: string;
  meetingFiles: any[] = [];
  uploadProgress = 0; // Upload progress indicator
  isUploading = false; // To show/hide progress bar
  uploadedFile!: File; 
  uploadedFileName!: string; // To store the original file name
  uploadedFileExtension!: string; // To store the file extension
 
   MIS_STATUS: string[] = [
=======
   MIS_Status: string[] = [
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
    'in-progress',
    'Resolved',
    'Rejected'
  ]
 constructor(private router: Router, private _fb: FormBuilder, private meetingService: MeetingService, private authService: AuthService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole() || 'unknown';
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
<<<<<<< HEAD
      User_Remark: [''], // Prepopulated, not editable
      MIS_STATUS: ['', Validators.required],
=======
      MIS_Status: ['', Validators.required],
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf

    });
    this.meetingSearchForm = this._fb.group({
      meetingId: ['', Validators.required]
    })
  }

  fetchMeetingDetails() {
    this.meetingService.getMeetingDetailsById(this.meetingId)
      .subscribe((response) => {
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
            MIS_STATUS: response[16]
            
          };
          this.meetingDetails = meetingDetails;
          this.originalRemark = meetingDetails.MIS_STATUS; // Store original remark
           // Populate the form with the fetched data
           this.fetchMeetingFiles(this.meetingId);
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

        if (meetingDetails.MIS_STATUS === 'Resolved') {
          // Disable form controls
          this.meetingDetailsForm.disable();
        }

=======
            Remark: response[10],
            
          };
          this.meetingDetails = meetingDetails;
          this.originalRemark = meetingDetails.Remark; // Store original remark
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
        } else {
          console.warn('No meeting details found for ID:', this.meetingId);
          // Handle case where no meeting is found (optional)
        }
      }, (error) => {
        console.error('Error fetching meeting details:', error);
        // Handle error (e.g., display error message to user)
      });
  }
 
<<<<<<< HEAD
  // fetchMeetingFiles(meetingId:string){
  //    this.meetingService.getMeetingFiles(meetingId)
  //     .subscribe((files) => {
  //       if (files && files.length > 0) {
  //         this.meetingFiles = files.map(file => ({
  //         file,
  //           fileUrl: `data:${file.fileType};base64,${file.fileData}`
  //         }));
  //         console.log('Fetched Files:', this.meetingFiles); // Log to check fetched files
  //       } else {
  //         console.warn('No files found for this meeting ID:', meetingId);
  //       }
  //     }, (error) => {
  //       console.error('Error fetching meeting files:', error);
  //     });
  // }
// second version where pdf preview working 
//   fetchMeetingFiles(meetingId: string) {
//     this.meetingService.getMeetingFiles(meetingId).subscribe(
//         (files) => {
//             if (files && files.length > 0) {
//                 this.meetingFiles = files.map((file) => ({
//                     ...file,
//                     fileUrl: `data:${file.fileType};base64,${file.fileData}` // Ensure Base64 URL
//                 }));
//             } else {
//                 this.toastr.warning('No files found for this meeting ID.');
//             }
//         },
//         (error) => {
//             console.error('Error fetching meeting files:', error);
//             this.toastr.error('Error fetching meeting files. Please try again.');
//         }
//     );
// }

// fetchMeetingFiles(meetingId: string) {
//   this.meetingService.getMeetingFiles(meetingId).subscribe(
//     (files) => {
//       if (files && files.length > 0) {
//         this.meetingFiles = files.map(file => ({
//           ...file,
//           fileUrl: `http://your-server-url/api/files/${file.fileId}` // Backend endpoint for file access
//         }));
//       } else {
//         this.toastr.warning('No files found for this meeting ID.');
//       }
//     },
//     (error) => {
//       console.error('Error fetching meeting files:', error);
//       this.toastr.error('Error fetching meeting files. Please try again.');
//     }
//   );
// }

// fetchMeetingFiles(meetingId: string) {
//   this.meetingService.getMeetingFiles(meetingId).subscribe(
//     (files) => {
//       if (files && files.length > 0) {
//         this.meetingFiles = files.map(file => ({
          
//           ...file,
//           // Since `fileUrl` points to the backend API, use it as-is for preview or download
//           fileUrl:file.fileUrl, // Use the URL directly from the API for file preview
//           fileName: file.fileName,
//           fileType: file.fileType
//         }));
//       } else {
//         this.toastr.warning('No files found for this meeting ID.');
//       }
//     },
//     (error) => {
//       console.error('Error fetching meeting files:', error);
//       this.toastr.error('Error fetching meeting files. Please try again.');
//     }
//   );
// }

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
//       console.error('Error fetching meeting files:', error);
//       this.toastr.error('Error fetching meeting files. Please try again.');
//     }
//   );
// }

fetchMeetingFiles(meetingId: string) {
  this.meetingService.getMeetingFiles(meetingId).subscribe(
    (files) => {
      if (files && files.length > 0) {
        this.meetingFiles = files.map(file => {
          const baseUrl = 'https://vef.manappuram.com';
          const fileUrl = file.fileUrl.startsWith('http') ? file.fileUrl : `${baseUrl}${file.fileUrl}`;
          return {
            ...file,
            fileUrl,
            fileName: file.fileName,
            fileType: file.fileType
          };
        });
      } else {
        this.toastr.warning('No files found for this meeting ID.');
      }
    },
    (error) => {
      console.error('Error fetching meeting files:', error.message); // Log error for debugging
      this.toastr.warning(error.message); // Show warning for 404 errors
    }
  );
}


=======
  
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
  onSearchMeetingId() {
    if (this.meetingSearchForm.valid) {
      const meetingId = this.meetingSearchForm.get('meetingId')?.value;
      this.meetingId = meetingId;
      this.fetchMeetingDetails(); // Call fetchMeetingDetails with retrieved ID
      this.meetingDetailsForm.reset();
    }
  }
<<<<<<< HEAD
  onSubmit() {
    console.log('Form Values on Submit:', this.meetingDetailsForm.value);
    if (this.meetingDetailsForm.valid) {
      console.log('Form is valid');
      
      const updatedRemark = this.meetingDetailsForm.get('MIS_STATUS')?.value;
      const meetingId = this.meetingDetails?.meetingId; // Extract ID from fetched data
      const updatedBy = String(this.authService.getEmpCode()); 
      const userRemark = this.meetingDetailsForm.get('User_Remark')?.value; // Get user's remark
  
      console.log('updated remark:', updatedRemark);
      console.log('userRemark:', userRemark);
      if (!meetingId) {
        console.error('Meeting ID not available');
        return; // Handle missing ID error
      }
  
      // Check if user's final remark is "Resolved"
      if (updatedRemark === 'Resolved' && userRemark !== 'Resolved') {
        // Show error message if conditions are not met
        this.toastr.error("User final remarks must be 'Resolved' to update MIS_STATUS to 'Resolved'");
        return; // Prevent form submission
      }
      this.meetingDetailsForm.reset()
      // Proceed with updating the MIS remark
      this.meetingService.updateMISRemark(meetingId, updatedRemark, updatedBy,userRemark)
        .subscribe(response => {
          // Handle successful update
          console.log('Remark updated successfully');
          this.toastr.success("Remark updated successfully");
        }, error => {
          // Handle error during update
          console.error('Error updating remark:', error);
        });
      
    } else {
      console.log('Form is invalid');
    }
  }
  
//   downloadFile(fileUrl: string, fileName: string) {
//     const link = document.createElement('a');
//     link.href = fileUrl;
//     link.download = fileName;
//     link.click();
// }

downloadFile(fileUrl: string, fileName: string) {
  // Check if the fileUrl already starts with 'http'. If so, do not prepend the domain
  const absoluteFileUrl = fileUrl.startsWith('http') ? fileUrl : `https://vef.manappuram.com${fileUrl}`;

  const link = document.createElement('a');
  link.href = absoluteFileUrl;  // Full URL to the file (handled by the reverse proxy)
  link.download = fileName;     // File name to use for downloading
  link.click();                 // Trigger the download by simulating a click
}

onFileChange(event: any) {
  const file = event.target.files[0];
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                        'text/csv', 'image/jpg', 'image/png'];

  if (file) {
    if (!allowedTypes.includes(file.type)) {
      this.toastr.error('Unsupported file format.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.toastr.error('File size should not exceed 2MB.');
      return;
    }

    this.uploadedFile = file;  // Store the file
    this.fileType = file.type; // Store the file type
    this.uploadedFileName = file.name.split('.').slice(0, -1).join('.');  // Extract the name without extension
    this.uploadedFileExtension = file.name.split('.').pop() || '';  // Extract the extension

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedFileUrl = e.target.result;  // Store the file URL for preview
      this.simulateUpload();  // Simulate upload progress (you can remove if not needed)
    };
    reader.readAsDataURL(file);  // Convert file to base64 for preview
  }
}simulateUpload() {
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


//   onViewFile(fileUrl: string) {
//     const newTab = window.open();
//     if (newTab) {
//         newTab.document.write(`
//             <html>
//                 <head>
//                     <title>File Preview</title>
//                 </head>
//                 <body style="margin:0;">
//                     <iframe src="${fileUrl}" style="width:100%; height:100%; border:none;"></iframe>
//                 </body>
//             </html>
//         `);
//     } else {
//         this.toastr.error('Could not open file preview. Please check your browser settings.', 'Error');
//     }
// }

// onViewFile(fileUrl: string, fileType: string) {
//   // Determine file preview method based on type
//   if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
//     // Open PDF or images directly
//     const newTab = window.open('', '_blank');
//     if (newTab) {
//       newTab.document.write(`
//         <iframe 
//           src="${fileUrl}" 
//           style="width:100%; height:100%; border:none;" 
//           frameborder="0">
//         </iframe>
//       `);
//     }
//   } else if (
//     fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || // PPTX
//     fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // DOCX
//     fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
//   ) {
//     // Use Google Docs Viewer for Office file formats
//     const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
//     window.open(googleViewerUrl, '_blank');
//   } else {
//     alert('Preview is not supported for this file type.');
//   }
// }
// onViewFile(fileUrl: string, fileType: string) {
//   if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
//     // Preview PDF or image files directly
//     const newTab = window.open('', '_blank');
//     if (newTab) {
//       newTab.document.write(`
//         <iframe 
//           src="${fileUrl}" 
//           style="width:100%; height:100%; border:none;" 
//           frameborder="0">
//         </iframe>
//       `);
//     }
//   } else if (
//     fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || // PPTX
//     fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // DOCX
//     fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
//   ) {
//     // Use Google Docs Viewer for Office file formats
//     const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
//     window.open(googleViewerUrl, '_blank');
//   } else {
//     this.toastr.warning('Preview is not supported for this file type.');
//   }
// }

// onViewFile(fileUrl: string, fileType: string) {
//   if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
//     // Preview PDF or image files directly
//     const newTab = window.open('', '_blank');
//     if (newTab) {
//       newTab.document.write(`
//         <iframe 
//           src="${fileUrl}" 
//           style="width:100%; height:100%; border:none;" 
//           frameborder="0">
//         </iframe>
//       `);
//     }
//   } else if (
//     fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || // PPTX
//     fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // DOCX
//     fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
//   ) {
//     // Use Google Docs Viewer for Office file formats
//     const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
//     window.open(googleViewerUrl, '_blank');
//   } else {
//     this.toastr.warning('Preview is not supported for this file type.');
//   }
// }

// onViewFile(fileUrl: string, fileType: string) {
//   this.meetingService.getMeetingFiles(fileUrl.split('/').pop()!).subscribe(
//     (fileBlob) => {
//       const blobUrl = URL.createObjectURL(fileBlob);

//       if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
//         // Open PDF or image files directly
//         const newTab = window.open('', '_blank');
//         if (newTab) {
//           newTab.document.write(`
//             <iframe 
//               src="${blobUrl}" 
//               style="width:100%; height:100%; border:none;" 
//               frameborder="0">
//             </iframe>
//           `);
//         }
//       } else if (
//         fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || // PPTX
//         fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // DOCX
//         fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
//       ) {
//         // Use Google Docs Viewer for Office file formats
//         const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(blobUrl)}&embedded=true`;
//         window.open(googleViewerUrl, '_blank');
//       } else {
//         this.toastr.warning('Preview is not supported for this file type.');
//       }
//     },
//     (error) => {
//       console.error('Error fetching file:', error);
//       this.toastr.error('Error fetching file. Please try again later.');
//     }
//   );
// }

onViewFile(fileUrl: string, fileType: string) {
  // Ensure the fileUrl does not get duplicated
  const fullFileUrl = fileUrl.startsWith('http') ? fileUrl : `http://localhost:3000${fileUrl}`;
  console.log('Generated Full File URL:', fullFileUrl); // Log the corrected URL

  if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(`
        <iframe 
          src="${fullFileUrl}" 
          style="width:100%; height:100%; border:none;" 
          frameborder="0">
        </iframe>
      `);
    }
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || // PPTX
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // DOCX
    fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
  ) {
    // const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullFileUrl)}&embedded=true`;
    // console.log('Google Docs Viewer URL:', googleViewerUrl); // Log the Google Docs Viewer URL
    // window.open(googleViewerUrl, '_blank');
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullFileUrl)}`;
    window.open(officeViewerUrl, '_blank');
  } else {
    this.toastr.warning('Preview is not supported for this file type.');
=======
  
 onSubmit() {
  console.log('Form Values on Submit:', this.meetingDetailsForm.value);
  if (this.meetingDetailsForm.valid) {
    console.log('Form is valid');
    
    const updatedRemark = this.meetingDetailsForm.get('MIS_STATUS')?.value;
    const meetingId = this.meetingDetails?.meetingId; // Extract ID from fetched data
    const updatedBy = String(this.authService.getEmpCode()); 
    const userRemark = this.meetingDetailsForm.get('Remark')?.value; // Get user's remark

    console.log('updated remark:', updatedRemark);
    console.log('userRemark:', userRemark);
    if (!meetingId) {
      console.error('Meeting ID not available');
      return; // Handle missing ID error
    }

    // Check if user's final remark is "Resolved"
    if (updatedRemark === 'Resolved' && userRemark !== 'Resolved') {
      // Show error message if conditions are not met
      this.toastr.error("User final remarks must be 'Resolved' to update MIS_STATUS to 'Resolved'");
      return; // Prevent form submission
    }
    this.meetingDetailsForm.reset()
    // Proceed with updating the MIS remark
    this.meetingService.updateMISRemark(meetingId, updatedRemark, updatedBy,userRemark)
      .subscribe(response => {
        // Handle successful update
        console.log('Remark updated successfully');
        this.toastr.success("Remark updated successfully");
      }, error => {
        // Handle error during update
        console.error('Error updating remark:', error);
      });
    
  } else {
    console.log('Form is invalid');
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
  }
}

}
<<<<<<< HEAD


=======
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
