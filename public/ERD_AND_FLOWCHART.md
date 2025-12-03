# 📊 ERD & Flowchart Documentation - PGE System

Dokumentasi lengkap Entity Relationship Diagram (ERD) dan Flowchart untuk PGE System.

---

## 📋 Daftar Isi

1. [Entity Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
2. [Flowchart Workflow](#flowchart-workflow)
3. [Penjelasan Relasi Database](#penjelasan-relasi-database)
4. [Penjelasan Workflow](#penjelasan-workflow)

---

## 🗄️ Entity Relationship Diagram (ERD)

### ERD Diagram Lengkap

```mermaid
erDiagram
    %% Core Tables
    users ||--o{ work_plans : creates
    users ||--o{ work_realizations : creates
    users ||--o{ leave_requests : submits
    users ||--o{ spd : submits
    users ||--o{ purchases : submits
    users ||--o{ vendor_payments : submits
    users ||--o{ activity_logs : performs
    users ||--o{ notifications : receives
    users }o--o{ modules : "has access"
    users }o--o{ projects : "manages"
    users }o--o{ roles : "has"
    users }o--o{ permissions : "has"
    
    %% Project Management
    projects ||--o{ work_plans : "assigned to"
    projects ||--o{ work_realizations : "assigned to"
    projects ||--o{ spd : "assigned to"
    projects ||--o{ purchases : "assigned to"
    projects ||--o{ vendor_payments : "assigned to"
    projects }o--o{ users : "managed by"
    
    %% Work Management
    work_plans ||--o{ work_realizations : "realized as"
    
    %% Leave Management
    leave_types ||--o{ leave_requests : "categorized as"
    users ||--o{ leave_requests : "approved by"
    
    %% Payment Management
    vendors ||--o{ vendor_payments : "paid to"
    
    %% Approval Relationships
    users ||--o{ leave_requests : "approves"
    users ||--o{ spd : "approves"
    users ||--o{ purchases : "approves"
    users ||--o{ vendor_payments : "approves"
    
    %% Module System
    modules }o--o{ users : "assigned to"
    
    %% Permission System (Spatie)
    roles }o--o{ permissions : "has"
    users }o--o{ roles : "assigned"
    
    %% Tables Definition
    users {
        bigint id PK
        string name
        string email UK
        string password
        string employee_id UK
        string phone
        string department
        string position
        date join_date
        integer annual_leave_quota
        integer remaining_leave
        text address
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    projects {
        bigint id PK
        string name
        string code UK
        string client
        text description
        date start_date
        date end_date
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    project_managers {
        bigint id PK
        bigint user_id FK
        bigint project_id FK
        string access_type
        timestamp created_at
        timestamp updated_at
    }
    
    work_plans {
        bigint id PK
        string work_plan_number UK
        bigint user_id FK
        string department
        bigint project_id FK
        date plan_date
        string title
        text description
        json objectives
        text expected_output
        string work_location
        decimal planned_duration_hours
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    work_realizations {
        bigint id PK
        string realization_number UK
        bigint user_id FK
        string department
        bigint work_plan_id FK
        bigint project_id FK
        date realization_date
        string title
        text description
        json achievements
        text output_description
        json output_files
        string work_location
        decimal actual_duration_hours
        integer progress_percentage
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    leave_types {
        bigint id PK
        string name
        text description
        integer max_days
        boolean requires_approval
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    leave_requests {
        bigint id PK
        string leave_number UK
        bigint user_id FK
        bigint leave_type_id FK
        date start_date
        date end_date
        integer total_days
        text reason
        string status
        text admin_notes
        text rejection_reason
        bigint approved_by FK
        timestamp approved_at
        string attachment_path
        string pdf_path
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    spd {
        bigint id PK
        string spd_number UK
        bigint user_id FK
        bigint project_id FK
        string destination
        date departure_date
        date return_date
        text purpose
        decimal transport_cost
        decimal accommodation_cost
        decimal meal_cost
        decimal other_cost
        text other_cost_description
        decimal total_cost
        string status
        text notes
        json costs
        text rejection_reason
        bigint approved_by FK
        timestamp approved_at
        string pdf_path
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    purchases {
        bigint id PK
        string purchase_number UK
        bigint user_id FK
        bigint project_id FK
        string type
        string item_name
        text description
        integer quantity
        string unit
        decimal unit_price
        decimal total_price
        string category
        string status
        text notes
        text rejection_reason
        bigint approved_by FK
        timestamp approved_at
        string pdf_path
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    vendors {
        bigint id PK
        string name
        string company
        string email
        string phone
        string bank_name
        string account_number
        string account_holder
        text address
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    vendor_payments {
        bigint id PK
        string payment_number UK
        bigint user_id FK
        bigint vendor_id FK
        bigint project_id FK
        string invoice_number
        string po_number
        decimal amount
        text description
        string payment_type
        date payment_date
        string status
        text notes
        text rejection_reason
        bigint approved_by FK
        timestamp approved_at
        string pdf_path
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    modules {
        bigint id PK
        string key UK
        string label
        string icon
        text description
        json routes
        json actions
        boolean assignable_to_user
        boolean admin_only
        boolean is_default
        boolean is_active
        integer sort_order
        string category
        timestamp created_at
        timestamp updated_at
    }
    
    module_user {
        bigint module_id FK
        bigint user_id FK
        timestamp created_at
        timestamp updated_at
    }
    
    activity_logs {
        bigint id PK
        bigint user_id FK
        string action
        string model_type
        bigint model_id
        string description
        json properties
        string ip_address
        string user_agent
        timestamp created_at
        timestamp updated_at
    }
    
    notifications {
        bigint id PK
        string type
        bigint notifiable_id FK
        string notifiable_type
        text data
        timestamp read_at
        timestamp created_at
        timestamp updated_at
    }
    
    roles {
        bigint id PK
        string name UK
        string guard_name
        timestamp created_at
        timestamp updated_at
    }
    
    permissions {
        bigint id PK
        string name UK
        string guard_name
        timestamp created_at
        timestamp updated_at
    }
```

---

## 🔄 Flowchart Workflow

### 1. Authentication & Authorization Flow

```mermaid
flowchart TD
    Start([User Mengakses Sistem]) --> Login{Login Page}
    Login --> Input[Input Email & Password]
    Input --> Validate{Validasi Credentials}
    Validate -->|Invalid| Error[Error: Invalid Credentials]
    Error --> Login
    Validate -->|Valid| CheckRole{Check Role}
    CheckRole -->|Admin| AdminDash[Admin Dashboard]
    CheckRole -->|User| UserDash[User Dashboard]
    AdminDash --> CheckModule{Check Module Access}
    UserDash --> CheckModule
    CheckModule -->|Has Access| GrantAccess[Grant Access]
    CheckModule -->|No Access| DenyAccess[403: Access Denied]
    GrantAccess --> End([Access Granted])
    DenyAccess --> End
```

### 2. Leave Request Workflow

```mermaid
flowchart TD
    Start([User Membuka Leave Module]) --> CheckAccess{User Memiliki<br/>Akses Leave?}
    CheckAccess -->|No| Deny[403: Access Denied]
    CheckAccess -->|Yes| Form[Form Pengajuan Cuti]
    Form --> Fill[Isi Form:<br/>- Leave Type<br/>- Start Date<br/>- End Date<br/>- Reason<br/>- Attachment]
    Fill --> Validate{Validasi Data}
    Validate -->|Invalid| Error[Show Validation Error]
    Error --> Fill
    Validate -->|Valid| CheckBalance{Check Leave Balance}
    CheckBalance -->|Insufficient| Insufficient[Error: Leave Balance Tidak Cukup]
    Insufficient --> Fill
    CheckBalance -->|Sufficient| Submit[Submit Request]
    Submit --> CreateRecord[Create Leave Request<br/>Status: PENDING]
    CreateRecord --> SendNotif[Send Notification<br/>to Approver]
    SendNotif --> LogActivity[Log Activity]
    LogActivity --> ApproverReview{Approver Review}
    ApproverReview -->|Approve| Approve[Update Status: APPROVED<br/>Set approved_by & approved_at]
    ApproverReview -->|Reject| Reject[Update Status: REJECTED<br/>Set rejection_reason]
    Approve --> UpdateBalance[Update User Leave Balance]
    UpdateBalance --> GeneratePDF[Generate PDF Certificate]
    GeneratePDF --> NotifyUser[Notify User: Approved]
    Reject --> NotifyUser2[Notify User: Rejected]
    NotifyUser --> LogActivity2[Log Activity]
    NotifyUser2 --> LogActivity2
    LogActivity2 --> End([Process Complete])
```

### 3. Payment Submission Workflow (SPD/Purchase/Vendor Payment)

```mermaid
flowchart TD
    Start([User Membuka Payment Module]) --> SelectType{Select Payment Type}
    SelectType -->|SPD| SPDForm[SPD Form]
    SelectType -->|Purchase| PurchaseForm[Purchase Form]
    SelectType -->|Vendor Payment| VendorForm[Vendor Payment Form]
    
    SPDForm --> FillSPD[Isi Form SPD:<br/>- Project<br/>- Destination<br/>- Dates<br/>- Costs]
    PurchaseForm --> FillPurchase[Isi Form Purchase:<br/>- Project<br/>- Item Details<br/>- Quantity & Price]
    VendorForm --> FillVendor[Isi Form Vendor Payment:<br/>- Vendor<br/>- Project<br/>- Invoice & Amount]
    
    FillSPD --> Validate{Validasi Data}
    FillPurchase --> Validate
    FillVendor --> Validate
    
    Validate -->|Invalid| Error[Show Validation Error]
    Error --> FillSPD
    Error --> FillPurchase
    Error --> FillVendor
    
    Validate -->|Valid| Calculate[Calculate Total]
    Calculate --> Submit[Submit Payment Request]
    Submit --> CreateRecord[Create Record<br/>Status: PENDING]
    CreateRecord --> SendNotif[Send Notification<br/>to Approver]
    SendNotif --> LogActivity[Log Activity]
    LogActivity --> ApproverReview{Approver Review}
    
    ApproverReview -->|Approve| Approve[Update Status: APPROVED<br/>Set approved_by & approved_at]
    ApproverReview -->|Reject| Reject[Update Status: REJECTED<br/>Set rejection_reason]
    
    Approve --> GeneratePDF[Generate PDF Document]
    GeneratePDF --> NotifyUser[Notify User: Approved]
    Reject --> NotifyUser2[Notify User: Rejected]
    
    NotifyUser --> LogActivity2[Log Activity]
    NotifyUser2 --> LogActivity2
    LogActivity2 --> End([Process Complete])
```

### 4. Work Management Workflow

```mermaid
flowchart TD
    Start([User Membuka Work Module]) --> Morning{Time of Day}
    Morning -->|Morning| WorkPlan[Create Work Plan]
    Morning -->|Evening| WorkRealization[Create Work Realization]
    
    WorkPlan --> FillPlan[Isi Work Plan:<br/>- Project<br/>- Title & Description<br/>- Objectives<br/>- Expected Output<br/>- Work Location<br/>- Planned Duration]
    FillPlan --> ValidatePlan{Validasi}
    ValidatePlan -->|Invalid| ErrorPlan[Show Error]
    ErrorPlan --> FillPlan
    ValidatePlan -->|Valid| SavePlan[Save Work Plan]
    SavePlan --> LogPlan[Log Activity]
    LogPlan --> NotifyPM[Notify Project Manager]
    NotifyPM --> EndPlan([Work Plan Created])
    
    WorkRealization --> SelectPlan{Select Related<br/>Work Plan?}
    SelectPlan -->|Yes| LinkPlan[Link to Work Plan]
    SelectPlan -->|No| Standalone[Standalone Realization]
    LinkPlan --> FillReal[Isi Work Realization:<br/>- Project<br/>- Title & Description<br/>- Achievements<br/>- Output Files<br/>- Actual Duration<br/>- Progress %]
    Standalone --> FillReal
    FillReal --> ValidateReal{Validasi}
    ValidateReal -->|Invalid| ErrorReal[Show Error]
    ErrorReal --> FillReal
    ValidateReal -->|Valid| SaveReal[Save Work Realization]
    SaveReal --> LogReal[Log Activity]
    LogReal --> NotifyPM2[Notify Project Manager]
    NotifyPM2 --> EndReal([Work Realization Created])
```

### 5. Project Management Workflow

```mermaid
flowchart TD
    Start([Admin Membuka Project Management]) --> List[View Project List]
    List --> Action{Action}
    Action -->|Create| CreateForm[Create Project Form]
    Action -->|Edit| EditForm[Edit Project Form]
    Action -->|View| ViewDetail[View Project Detail]
    Action -->|Assign PM| AssignPM[Assign Project Manager]
    
    CreateForm --> FillProject[Isi Project:<br/>- Name & Code<br/>- Client<br/>- Description<br/>- Dates]
    FillProject --> Validate{Validasi}
    Validate -->|Invalid| Error[Show Error]
    Error --> FillProject
    Validate -->|Valid| SaveProject[Save Project]
    SaveProject --> LogActivity[Log Activity]
    LogActivity --> EndCreate([Project Created])
    
    AssignPM --> SelectUser[Select User]
    SelectUser --> SelectAccess{Select Access Type}
    SelectAccess -->|PM| PMAccess[PM Access:<br/>Work Plans & Realizations]
    SelectAccess -->|Finance| FinanceAccess[Finance Access:<br/>Payments Only]
    SelectAccess -->|Full| FullAccess[Full Access:<br/>All Features]
    PMAccess --> SavePM[Save Project Manager]
    FinanceAccess --> SavePM
    FullAccess --> SavePM
    SavePM --> LogPM[Log Activity]
    LogPM --> EndPM([PM Assigned])
    
    ViewDetail --> ShowDashboard[Show Project Dashboard:<br/>- Work Plans<br/>- Work Realizations<br/>- SPD<br/>- Purchases<br/>- Vendor Payments]
    ShowDashboard --> Filter{Filter Options}
    Filter -->|By Date| FilterDate[Filter by Date Range]
    Filter -->|By User| FilterUser[Filter by User]
    Filter -->|By Status| FilterStatus[Filter by Status]
    FilterDate --> EndView([View Complete])
    FilterUser --> EndView
    FilterStatus --> EndView
```

### 6. User Management Workflow (Admin Only)

```mermaid
flowchart TD
    Start([Admin Membuka User Management]) --> List[View User List]
    List --> Action{Action}
    Action -->|Create| CreateForm[Create User Form]
    Action -->|Edit| EditForm[Edit User Form]
    Action -->|Assign Module| AssignModule[Assign Modules]
    Action -->|Assign Role| AssignRole[Assign Roles]
    
    CreateForm --> FillUser[Isi User Data:<br/>- Name & Email<br/>- Employee ID<br/>- Department & Position<br/>- Leave Quota]
    FillUser --> Validate{Validasi}
    Validate -->|Invalid| Error[Show Error]
    Error --> FillUser
    Validate -->|Valid| SaveUser[Save User]
    SaveUser --> AssignDefaultModules[Assign Default Modules:<br/>Work Plan & Work Realization]
    AssignDefaultModules --> LogActivity[Log Activity]
    LogActivity --> EndCreate([User Created])
    
    AssignModule --> SelectModules[Select Modules to Assign]
    SelectModules --> CheckDefault{Is Default Module?}
    CheckDefault -->|Yes| AutoAssign[Auto-Assign<br/>Cannot Remove]
    CheckDefault -->|No| ManualAssign[Manual Assign]
    AutoAssign --> SaveModules[Save Module Assignment]
    ManualAssign --> SaveModules
    SaveModules --> LogModule[Log Activity]
    LogModule --> EndModule([Modules Assigned])
    
    AssignRole --> SelectRole[Select Role:<br/>Admin or User]
    SelectRole --> SaveRole[Save Role Assignment]
    SaveRole --> LogRole[Log Activity]
    LogRole --> EndRole([Role Assigned])
```

### 7. Approval Workflow (Centralized)

```mermaid
flowchart TD
    Start([Approver Membuka Approval Page]) --> CheckPermission{Check Permission}
    CheckPermission -->|No Permission| Deny[403: Access Denied]
    CheckPermission -->|Has Permission| ViewPending[View Pending Submissions]
    
    ViewPending --> Filter{Filter Options}
    Filter -->|By Type| FilterType[Filter by Type:<br/>Leave/SPD/Purchase/Vendor Payment]
    Filter -->|By Status| FilterStatus[Filter by Status]
    Filter -->|By Date| FilterDate[Filter by Date Range]
    FilterType --> List[Show Filtered List]
    FilterStatus --> List
    FilterDate --> List
    
    List --> Select[Select Submission]
    Select --> ViewDetail[View Submission Details]
    ViewDetail --> Review{Review Decision}
    
    Review -->|Approve| ApproveAction[Click Approve]
    Review -->|Reject| RejectAction[Click Reject]
    
    ApproveAction --> UpdateStatus[Update Status: APPROVED<br/>Set approved_by & approved_at]
    UpdateStatus --> GeneratePDF{Generate PDF?}
    GeneratePDF -->|Yes| CreatePDF[Generate PDF Document]
    GeneratePDF -->|No| SkipPDF[Skip PDF]
    CreatePDF --> NotifyUser[Notify User: Approved]
    SkipPDF --> NotifyUser
    
    RejectAction --> InputReason[Input Rejection Reason]
    InputReason --> UpdateStatus2[Update Status: REJECTED<br/>Set rejection_reason]
    UpdateStatus2 --> NotifyUser2[Notify User: Rejected]
    
    NotifyUser --> LogActivity[Log Activity]
    NotifyUser2 --> LogActivity
    LogActivity --> End([Approval Process Complete])
```

---

## 🔗 Penjelasan Relasi Database

### 1. User Relationships

#### One-to-Many Relationships
- **users → work_plans**: Satu user dapat membuat banyak work plan
- **users → work_realizations**: Satu user dapat membuat banyak work realization
- **users → leave_requests**: Satu user dapat mengajukan banyak cuti
- **users → spd**: Satu user dapat membuat banyak SPD
- **users → purchases**: Satu user dapat membuat banyak purchase request
- **users → vendor_payments**: Satu user dapat membuat banyak vendor payment
- **users → activity_logs**: Satu user dapat melakukan banyak aktivitas

#### Many-to-Many Relationships
- **users ↔ modules**: User dapat memiliki banyak modul, modul dapat di-assign ke banyak user
- **users ↔ projects**: User dapat menjadi Project Manager untuk banyak project, project dapat memiliki banyak PM
- **users ↔ roles**: User dapat memiliki banyak role (Spatie Permission)
- **users ↔ permissions**: User dapat memiliki banyak permission (Spatie Permission)

#### Self-Referencing Relationships
- **users → leave_requests (approved_by)**: User dapat menyetujui banyak leave request
- **users → spd (approved_by)**: User dapat menyetujui banyak SPD
- **users → purchases (approved_by)**: User dapat menyetujui banyak purchase
- **users → vendor_payments (approved_by)**: User dapat menyetujui banyak vendor payment

### 2. Project Relationships

#### One-to-Many Relationships
- **projects → work_plans**: Satu project dapat memiliki banyak work plan
- **projects → work_realizations**: Satu project dapat memiliki banyak work realization
- **projects → spd**: Satu project dapat memiliki banyak SPD
- **projects → purchases**: Satu project dapat memiliki banyak purchase
- **projects → vendor_payments**: Satu project dapat memiliki banyak vendor payment

#### Many-to-Many Relationships
- **projects ↔ users (via project_managers)**: Project dapat memiliki banyak PM, user dapat manage banyak project

### 3. Work Management Relationships

#### One-to-Many Relationships
- **work_plans → work_realizations**: Satu work plan dapat memiliki banyak work realization (realisasi)

### 4. Leave Management Relationships

#### One-to-Many Relationships
- **leave_types → leave_requests**: Satu tipe cuti dapat memiliki banyak request

### 5. Payment Management Relationships

#### One-to-Many Relationships
- **vendors → vendor_payments**: Satu vendor dapat menerima banyak payment

### 6. Activity Log Relationships

#### Polymorphic Relationships
- **activity_logs → models**: Activity log dapat merekam aktivitas berbagai model (polymorphic)

---

## 📝 Penjelasan Workflow

### 1. Authentication & Authorization

**Proses:**
1. User mengakses sistem melalui halaman login
2. Input email dan password
3. Sistem validasi credentials
4. Jika valid, check role user (Admin/User)
5. Redirect ke dashboard sesuai role
6. Setiap akses modul dicek permission dan module access

**Kontrol Akses:**
- **Role-based**: Admin memiliki akses penuh, User memiliki akses terbatas
- **Module-based**: User hanya dapat mengakses modul yang di-assign
- **Permission-based**: Setiap aksi dicek permission menggunakan Spatie Permission

### 2. Leave Request Workflow

**Proses:**
1. User mengisi form pengajuan cuti
2. Validasi data (tanggal, balance, dll)
3. Check leave balance user
4. Create leave request dengan status PENDING
5. Kirim notifikasi ke approver
6. Approver review dan approve/reject
7. Jika approved: update balance, generate PDF
8. Kirim notifikasi ke user
9. Log semua aktivitas

**Status:**
- **PENDING**: Menunggu persetujuan
- **APPROVED**: Disetujui
- **REJECTED**: Ditolak

### 3. Payment Submission Workflow

**Proses:**
1. User memilih jenis payment (SPD/Purchase/Vendor Payment)
2. Mengisi form sesuai jenis payment
3. Validasi data dan perhitungan total
4. Submit dengan status PENDING
5. Kirim notifikasi ke approver
6. Approver review dan approve/reject
7. Jika approved: generate PDF document
8. Kirim notifikasi ke user
9. Log semua aktivitas

**Jenis Payment:**
- **SPD**: Surat Perjalanan Dinas dengan detail biaya
- **Purchase**: Purchase request dengan item detail
- **Vendor Payment**: Pembayaran ke vendor dengan invoice tracking

### 4. Work Management Workflow

**Work Plan:**
1. User membuat work plan di pagi hari
2. Assign ke project tertentu
3. Isi detail rencana kerja
4. Save dan notify Project Manager

**Work Realization:**
1. User membuat work realization di sore hari
2. Dapat link ke work plan terkait (optional)
3. Isi detail realisasi kerja
4. Upload output files jika ada
5. Save dan notify Project Manager

### 5. Project Management Workflow

**Project Creation:**
1. Admin membuat project baru
2. Isi detail project (name, code, client, dates)
3. Set project sebagai active/inactive

**Project Manager Assignment:**
1. Admin assign user sebagai Project Manager
2. Pilih access type:
   - **PM**: Akses Work Plans & Realizations
   - **Finance**: Akses Payments only
   - **Full**: Akses semua fitur
3. Project Manager dapat monitor project di dashboard

### 6. User Management Workflow

**User Creation:**
1. Admin membuat user baru
2. Isi data user lengkap
3. Assign default modules (Work Plan & Work Realization)
4. Assign role (Admin/User)

**Module Assignment:**
1. Admin assign modules ke user
2. Default modules selalu aktif (tidak bisa dihapus)
3. Optional modules dapat di-assign sesuai kebutuhan

**Role Assignment:**
1. Admin assign role ke user
2. Role menentukan akses dasar user
3. Permission granular diatur melalui Spatie Permission

### 7. Approval Workflow

**Proses Approval:**
1. Approver membuka halaman approval
2. Filter submissions berdasarkan type, status, date
3. Review detail submission
4. Approve atau Reject dengan reason
5. Update status di database
6. Generate PDF jika approved
7. Kirim notifikasi ke user
8. Log aktivitas

**Approval Types:**
- **Leave Approval**: Persetujuan cuti
- **Payment Approval**: Persetujuan SPD, Purchase, Vendor Payment

---

## 📊 Indexes & Performance

### Indexes yang Diterapkan

1. **users**
   - `email` (unique)
   - `employee_id` (unique)

2. **work_plans**
   - `work_plan_number` (unique)
   - `user_id, plan_date` (composite)
   - `project_id`

3. **work_realizations**
   - `realization_number` (unique)
   - `user_id, realization_date` (composite)
   - `work_plan_id`
   - `project_id`

4. **leave_requests**
   - `leave_number` (unique)
   - `user_id, status` (composite)
   - `status`

5. **spd**
   - `spd_number` (unique)
   - `user_id, status` (composite)
   - `status`

6. **purchases**
   - `purchase_number` (unique)
   - `user_id, status` (composite)
   - `status`

7. **vendor_payments**
   - `payment_number` (unique)
   - `user_id, status` (composite)
   - `payment_date`

8. **project_managers**
   - `user_id, project_id` (unique composite)
   - `user_id`
   - `project_id`

9. **activity_logs**
   - `user_id, created_at` (composite)
   - `model_type, model_id` (composite)
   - `action`
   - `created_at`

---

## 🔐 Constraints & Rules

### Foreign Key Constraints

1. **Cascade Delete:**
   - `users` → `work_plans`, `work_realizations`, `leave_requests`, `spd`, `purchases`, `vendor_payments`
   - `vendors` → `vendor_payments`
   - `leave_types` → `leave_requests`

2. **Set Null on Delete:**
   - `projects` → `work_plans`, `work_realizations`, `spd`, `purchases`, `vendor_payments`
   - `users` → `leave_requests.approved_by`, `spd.approved_by`, `purchases.approved_by`, `vendor_payments.approved_by`
   - `work_plans` → `work_realizations.work_plan_id`

3. **Unique Constraints:**
   - `users.email`
   - `users.employee_id`
   - `projects.code`
   - `work_plans.work_plan_number`
   - `work_realizations.realization_number`
   - `leave_requests.leave_number`
   - `spd.spd_number`
   - `purchases.purchase_number`
   - `vendor_payments.payment_number`
   - `project_managers(user_id, project_id)`

### Business Rules

1. **Leave Balance:**
   - User tidak dapat mengajukan cuti melebihi `remaining_leave`
   - Setelah approved, `remaining_leave` dikurangi `total_days`

2. **Project Manager:**
   - Satu user dapat menjadi PM untuk banyak project
   - Satu project dapat memiliki banyak PM dengan access type berbeda

3. **Work Realization:**
   - Dapat link ke work plan (optional)
   - Dapat standalone (tidak link ke work plan)

4. **Approval:**
   - Hanya user dengan permission dapat approve
   - Admin dapat approve semua jenis submission
   - User dapat approve jika memiliki module approval access

5. **Soft Deletes:**
   - Semua submission menggunakan soft delete
   - Data tidak benar-benar dihapus dari database

---

## 📌 Catatan Penting

1. **Modular Architecture**: Sistem menggunakan arsitektur modular dengan enable/disable per user
2. **RBAC**: Menggunakan Spatie Permission untuk role dan permission management
3. **Audit Trail**: Semua aktivitas dicatat di `activity_logs`
4. **Notifications**: Real-time notifications untuk semua event penting
5. **PDF Generation**: Auto-generate PDF untuk dokumen resmi setelah approval
6. **Soft Deletes**: Semua submission menggunakan soft delete untuk data recovery

---

**Dokumen ini dibuat untuk PGE System v1.10.0**
**Last Updated**: 2025

