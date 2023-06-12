<template>
<div>
  <div class="container mt-3">
      <div class="row">
          <div class="col">
              <p class="h3 text-success fw-bold">Edit Contact</p>
          </div>
      </div>
  </div> 
  <div class="container">
      <div class="row">
          <div class="col-md-4">
              <form @submit.prevent="updateSubmit()">
                  <div class="mb-2">
                      <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
                  </div>
                  <div class="mb-2">
                      <input v-model="contact.lastname" type="text" class="form-control" placeholder=" Last Name">
                  </div>
                  <div class="mb-2">
                      <input v-model="contact.fieldofemployment" type="text" class="form-control" placeholder="Field of Employment">
                  </div>
                  <div class="mb-2">
                      <input v-model="contact.about" type="text" class="form-control" placeholder="About">
                  </div>
                  <div class="mb-2">
                      <select v-model="contact.groupId" class="form-control">
                          <option value="">Select Skill</option>
                          <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
                      </select>
                  </div>
                  <div class="mb-2">
                      <input type="submit" class="btn btn-success" value="Update">
                  </div>
              </form>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import { ContactService } from "@/services/ContactService";

export default {
    name: "EditContact",
    data : function (){
      return{
        contactId : this.$route.params.contactId,
        loading : false,
        contact : {
                name : '',
                lastname : '',
                fieldofemployment : '',
                about : '',
                groupId : ''
            },
        errorMessage : null,
      }
    },
    created : async function (){
      try {
        this.loading =true;
        let response = await ContactService.getContact(this.contactId);
        let groupResponse = await ContactService.getAllGroups();
        this.contact = response.data;
        this.groups = groupResponse.data;
        this.loading = false;
      }
      catch (error){
        this.errorMessage = error;
        this.this.loading = false;
      }
    },
    methods : {
      updateSubmit : async function (){
        try {
                let response = await ContactService.updateContact(this.contact, this.contactId);
                if(response){
                    return this.$router.push('/');
                }
                else{
                    return this.$router.push(`/contacts/edit/${this.contactId}`);
                }
            }
            catch (error){
                console.log(error);
            }
      }
    }
}
</script>

<style scoped>

</style>