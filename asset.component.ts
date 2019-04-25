import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset/asset';
import { ToastrService } from 'ngx-toastr';
import { PagerModel } from '../../models/pagermodel/pager.model';
import { PagedDataInquiryResponse } from '../../models/PagedDataEnquiryResponse/PagedDataInquiryResponse';
import { PagedDataRequest } from '../../models/PagedDataRequest/pagedDataRequest';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AssetService } from '../../services/asset/asset.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PagerService } from '../../services/pager.service';
import { SignalRService } from '../../services/signal-r.service';
import { Category } from '../../models/category/category';
import { subCategory } from '../../models/subCategory/subCategory';
import { HeaderService } from 'src/app/services/header/header.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

 
  public assetList: Asset[];
  public asset: Asset = new Asset();
  public pagedDataInquiryResponse = new PagedDataInquiryResponse();
  public pagedDataRequest = new PagedDataRequest();
  public pager: PagerModel = new PagerModel();
  public orderBy: string;
  public headerTitle: string;
  public currentUserAssets: boolean = false;
  public isDescending: boolean = true;

  loading: boolean = false;

  public isAsset: boolean = false;
  public isCategory: boolean = false;
  public isSubCategory: boolean = false;
  public pageSizes: number[] = [2,5,10,25,100]
  public categories: any;
  subCategories: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  deleteId: number;
  deleteConfirm: boolean = false;
  searchText: string;
  public search: boolean = false;
  public showForm: boolean = true;
 

  private _hubConnection: HubConnection | undefined;
  public async: any;
  message = '';
  messages: string[] = [];
  listOfAttachments: any[] = [];
  public attachfile: Document = new Document();


  constructor(private assetService: AssetService,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private pagerService: PagerService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private header:HeaderService,
    private nav:SidenavService,
    private signalR: SignalRService) {
    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.pageNumber = 0;
    this.pagedDataRequest.totalRecords = 0;
    this.pagedDataRequest.pageSize = 10;
    this.asset.category = new Category();
    this.asset.subCategory = new subCategory();

  }
  //private _hubConnection: HubConnection;
  msgs: any[] = [];
 
  ngOnInit() {
    this.nav.show();
    this.header.show();
    this.selectedItems = [
      { id: 3, categoryName: 'Demo  catagory' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'categoryName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.getPagedList(0);
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getPagedList(offset) {
    if (offset === 0) this.pagedDataRequest.pageNumber = offset + 1;
    else this.pagedDataRequest.pageNumber = offset;
      this.assetService.getAll(this.currentUserAssets, this.pagedDataRequest, this.orderBy).subscribe(
        (response) => {
          this.loadDatasucessful(response.result)
        },
        (err) => { this.toastrService.error(err || err.message) }
      )
  }

  getAssetList(val) {
    if (val) {
      this.currentUserAssets = true;
      this.getPagedList(0);
  
    }
    else {
      this.currentUserAssets = false;
      this.getPagedList(0);

    }
  }
   
  
  loadDatasucessful(pagedData) {
    if (pagedData) {
      this.pagedDataInquiryResponse.pageNumber = pagedData.currentPage;
      this.pagedDataInquiryResponse.pageCount = pagedData.pageCount;
      this.pagedDataInquiryResponse.pageSize = pagedData.pageSize;
      this.pagedDataInquiryResponse.items = Array(this.pagedDataInquiryResponse.pageCount).fill(this.pagedDataInquiryResponse.pageCount).map((x, i) => i);
      this.pagedDataInquiryResponse.totalRecords = pagedData.rowCount;
      this.pagedDataInquiryResponse.firstRowOnPage = pagedData.firstRowOnPage;

    }
    this.pager = this.pagerService.getPager(pagedData.pageCount, pagedData.currentPage, pagedData.pageSize);
    this.assetList = pagedData.results;
  }

  sortByField(isDescending, filter) {
    switch (filter) {
      case "asset":
        if (isDescending) {
          this.isAsset = true;
          this.orderBy = "name_Desc";
          this.isDescending = false;
        }
        else {
          this.isAsset = false;
          this.orderBy = "";
          this.isDescending = true;
        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;
      case "category":
        if (isDescending) {
          this.orderBy = "Categoryname_Desc";
          this.isDescending = false;
          this.isCategory = true;

        }
        else {
          this.orderBy = "category";
          this.isDescending = true;
          this.isCategory = false;

        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;
      case "subCategory":
        if (isDescending) {
          this.orderBy = "subCategory_Desc";
          this.isDescending = false;
          this.isSubCategory = true;

        }
        else {
          this.orderBy = "subCategory";
          this.isDescending = true;
          this.isSubCategory = false;

        }
        this.getPagedList(this.pagedDataRequest.pageNumber)
        break;
    }
  }


  searchField(searchText, isSearchByText: boolean) {
    if (!searchText) searchText = "";
    this.loading = true;
    if (isSearchByText) {
      this.pagedDataRequest.searchText = searchText;
      this.pagedDataRequest.searchDate = null;

    }
    if (!isSearchByText) {
      this.pagedDataRequest.searchDate = searchText;
      this.pagedDataRequest.searchText = null;
    }
    this.pagedDataRequest.isSearchByText = isSearchByText;
    this.assetService.getAll(this.currentUserAssets, this.pagedDataRequest, this.orderBy).subscribe(
      results => this.loadDatasucessful(results.result),
      error => { console.log(error) });
  }
  cancelSearch() {
    this.search = false;
    if (!this.searchText) {
      // this.getResults(this.searchBy);
    }
  }

  public sendMessage(): void {
    const data = `Sent: ${this.message}`;

    if (this._hubConnection) {
      this._hubConnection.invoke('Send', data);
    }
    this.messages.push(data);
  }

  currentUserAssetsChanged() {
    this.currentUserAssets = !this.currentUserAssets;
    this.getPagedList(0);
  }
  addOrEdit(val) {
    this.showForm = false;
    if (val) {
      this.headerTitle = 'Edit Department';
      this.getAssetDetail(val);
      this.getCategoryList();
      //this.getSubCategoryDropDownList();
    } else {
      this.getCategoryList();
      this.headerTitle = "Add Asset";
      this.asset = new Asset();
    }
  }
  getAssetDetail(id) {
   
      this.assetService.getById(id).subscribe(
        (response) => {
          this.asset = response.result;
          this.getSubCategoryDetail();
        }, (err) => { this.toastrService.error(err || err.message) })
    
  }

  getSubCategoryDetail() {
    this.assetService.getSubCategoryDropDownList(this.asset.categoryId).subscribe(
      response => {
        this.subCategories = response.result as subCategory;
      }, (err) => { this.toastrService.error(err || err.message) })
      
  }
  submit(assetForm: NgForm) {
    if (assetForm.valid) {
      console.log(JSON.stringify(assetForm.value));
      if (!this.asset.id) {
        this.asset.attachments = this.listOfAttachments;
        this.assetService.Create(this.asset as Asset).subscribe(
          (response) => {
            response.success == true ? this.toastrService.success(response.message) : this.toastrService.error(response.message);
            this.router.navigate(['/addAsset', response.result]);
      
            this.getPagedList(0);
            assetForm.reset();
          },
          (err) => { this.toastrService.error(err || err.message) })
      }
      else {
        this.assetService.editAsset(this.asset as Asset).subscribe(
          (response) => {
            response.success == true ? this.toastrService.success(response.message) : this.toastrService.error(response.message)
            this.getPagedList(0);
          }, (err) => { this.toastrService.error(err || err.message) })
      }
    }
  }

  routeToAssetDetail(assetId) {
    this.router.navigate(['/asset-detail'], { queryParams: { assetId: assetId } });
  }

  getCategoryList() {
    this.assetService.getCategoryDropDownList().subscribe(
      response => {
        this.categories = response.result;
      }, (err) => { this.toastrService.error(err || err.message) });
  }

  onCategoryChange() {
    this.getSubCategoryDropDownList();
  }
  getSubCategoryDropDownList() {
    this.assetService.getSubCategoryDropDownList(this.asset.categoryId).subscribe(
      response => {
        this.subCategories = response.result as subCategory;
      }, (err) => { this.toastrService.error(err || err.message) });
  }

  delete(id) {
    this.deleteId = id;
  }

  onCancel(assetForm: NgForm) {
    assetForm.reset();
  }
  onDeleteConfirm(isTrue: boolean) {
    if (isTrue) this.deleteConfirm == true;
    this.assetService.delete(this.deleteId).subscribe(
      (response) => {
        response.success == true ? this.toastrService.success(response.message) : this.toastrService.error(response.message);
        this.getPagedList(0);
      }, (err) => { console.error(err || err.message) })
    this.deleteConfirm = false
  }

  onChange() {
    this.getPagedList(0);
  }

  add() {
    this.router.navigate['addAsset'];
  }

  backToList() {
    this.showForm = true;
    this.getPagedList(0);
  }

  submitFiles($event) {
    this.listOfAttachments.push($event);
 

  }


}
