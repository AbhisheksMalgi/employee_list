<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <router-link to="/" class="btn btn-success ms-3"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
      </div>
    </div>
  <div class="container mt-3">
      <div class="row">
          <div class="col">
              <p class="h3 text-success fw-bold">View Contact</p>
          </div>
      </div>
  </div> 
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
  <div class="container" v-if="!loading && isDone">
    <div class="row align-items-center">
      <div class="col-md-6">
        <ul class="list-group">
             <li class="list-group-item">Name : <span class="fw-bold">{{contact.name}}</span></li>
             <li class="list-group-item">Last Name : <span class="fw-bold">{{contact.lastname}}</span></li>
             <li class="list-group-item">Field of Employment : <span class="fw-bold">{{contact.fieldofemployment}}</span></li>
             <li class="list-group-item">About : <span class="fw-bold">{{contact.about}}</span></li>
             <li class="list-group-item">Skill : <span class="fw-bold">{{group.skill}}</span></li>
         </ul>
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
    name: "ViewContact",
    data : function(){
      return {
        contactId : this.$route.params.contactId,
        loading : false,
        contact : {},
        errorMessage : null,
        group : {}
      }
    },
    created : async function (){
      try {
        this.loading = true;
        let response = await ContactService.getContact(this.contactId);
        let groupResponse = await ContactService.getGroup(response.data);
        this.contact = response.data;
        this.group = groupResponse.data;
        this.loading = false;
      }
      catch (error){
        this.errorMessage = error;
        this.loading = false;
      }
    },
    methods : {
      isDone : function (){
        return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
      }
    }
}

</script>

<style scoped>

</style>