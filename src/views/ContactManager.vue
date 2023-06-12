<template>
    <div> 
<div v-if="loading">
    <div class="container">
        <div class="row">
            <div class="col">
                <spinner/>
            </div>
        </div>
    </div>
</div>

<div v-if="!loading && errorMessage">
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h4 text-danger fw-bold">{{errorMessage}}</p>
            </div>
        </div>
    </div>
</div>
    <div class="container mt-3" v-if="contacts.length > 0">
        <div class="row ">
            <div class="col-md-6" v-for="contacts of contacts" :key="contacts">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <RouterLink :to="`/contacts/view/${contacts.id}`" class="border border-0">    
                            <div class="col-sm-7">
                                <ul class="list-group">
                                    <li class="list-group-item">Name : <span class="fw-bold">{{contacts.name}}</span></li>
                                    <li class="list-group-item">Last Name : <span class="fw-bold">{{contacts.lastname}}</span></li>
                                    <li class="list-group-item">Field of Employment : <span class="fw-bold">{{contacts.fieldofemployment}}</span></li>
                                </ul>
                            </div>
                                </RouterLink>
                            <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                                <RouterLink :to="`/contacts/edit/${contacts.id}`" class="btn btn-primary my-1">
                                    <i class="fa fa-pen"></i>
                                </RouterLink>
                                <button class="btn btn-danger my-1" @click="clickDeleteContact(contacts.id)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                    <RouterLink to="/contacts/add" class="btn btn-success btn-sm" id = "btn"><i class="fa fa-plus-circle"></i> New</RouterLink>
            </div>
        </div>
    </div>
</div>
  </template>
  
  <script>
import { ContactService } from '@/services/ContactService';
import Spinner from '../components/Spinner.vue';

  export default {
  components: { Spinner },
      name: "ContactManager",
      data : function (){
        return {
            loading : false,
            contacts : [],
            errorMessage : null
        }
      },
      created : async function (){
         try {
            this.loading = true;
            let response = await ContactService.getAllContacts()
            this.contacts = response.data;
            this.loading = false;
         }
         catch (error){
            this.errorMessage = error;
            this.loading = false;
         }
      },
      methods : {
        clickDeleteContact : async function (contactId){
            try {
                this.loading = true; 
                let response = await ContactService.deleteContact(contactId);
                if(response){
                   let response = await ContactService.getAllContacts()
                   this.contacts = response.data;
                   this.loading = false;
                }
            }
            catch (error){
                this.errorMessage = error;
                this.loading = false;
            }
        }
      }

  }
  </script>
  
  <style scoped>
  
  </style>