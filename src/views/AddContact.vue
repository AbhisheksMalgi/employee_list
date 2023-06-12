<template>
<div>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Add Contact</p>
            </div>
        </div>
    </div> 
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">
            <form @submit.prevent="submitCreate()">
                <div class="mb-2">
                    <input required v-model="contact.name" type="text" class="form-control" placeholder="Name">
                </div>
                <div class="mb-2">
                    <input required v-model="contact.lastname" type="text" class="form-control" placeholder="Last Name">
                </div>
                <div class="mb-2">
                    <input required v-model="contact.fieldofemployment" type="text" class="form-control" placeholder="Field of Employment">
                </div>
                <div class="mb-2">
                    <input required v-model="contact.about" type="text" class="form-control" placeholder="About">
                </div>
                <div class="d-flex">
                    <input type="text" placeholder="Enter Skill" class="from-control">
                    <button class="btn btn-warning rounded-0"><i class="fa fa-add"></i></button> 
                </div>
                <div class="mt-2">
                    <input type="submit" class="btn btn-success" value="Create">
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
</template>
  
  <script>
import { ContactService } from '@/services/ContactService';

  export default {
      name: "AddContact",
      data : function (){
        return {
            contact : {
                name : '',
                lastname : '',
                fieldofemployment : '',
                about : '',
                groupId : ''
            },
            groups : []
        }
      },
      created : async function (){
        try {
            let response = await ContactService.getAllGroups();
            this.groups = response.data;
        }
        catch(error){
            console.log(error);
        }
      },
      methods : {
        submitCreate : async function (){
            try {
                let response = await ContactService.createContact(this.contact);
                if(response){
                    return this.$router.push('/');
                }
                else{
                    return this.$router.push('/contacts/add');
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