<template>
    <div>
        <div class="container mt-3">
            <div class="row">
                <div class="col">
                    <p class="h3 text-center fw-bold">Add</p>
                </div>
            </div>
        </div>
        <div class="container mt-3">
            <div class="row">
                <div class="col-md-4">
                    <form @submit.prevent="submitCreate()">
                        <div class="mb-2">
                            <input required v-model="contact.firstName" type="text" class="form-control" placeholder="Name">
                        </div>
                        <div class="mb-2">
                            <input required v-model="contact.lastName" type="text" class="form-control"
                                placeholder="Last Name">
                        </div>
                        <div class="mb-2">
                            <input required v-model="contact.department" type="text" class="form-control"
                                placeholder="Field of Employment">
                        </div>
                        <div v-for="(skill, index) in contact.skills" :key="index">
                            <label>Skill {{ index + 1 }}</label>
                            <input class="ms-2 my-2" type="text" v-model="contact.skills[index]" placeholder="Enter skill">
                            <button class="btn btn-sm btn-primary ms-1" type="button" @click="removeField(index)"
                                v-show="index > 0">Remove</button>
                        </div>
                        <button class="btn btn-sm btn-primary ms-2 my-2" type="button" @click="addField">Add Skill</button>
                        <div class="mb-2">
                            <input required v-model="contact.info" type="text" class="form-control" placeholder="About">
                        </div>
                        <div class="col-sm-1 d-flex flex align-items-center">
                            <router-link to="/" class="btn btn-primary ms-3">Cancel</router-link>
                            <input type="submit" class="btn btn-primary ms-2 my-2" value="Save">
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
    data: function () {
        return {
            contact: {
                active: true,
                department: '',
                firstName: '',
                lastName: '',
                info: '',
                skills: [""],
            },
        }
    },
    created: async function () {
        try {
            let response = await ContactService.getAllGroups();
            this.groups = response.data;
        }
        catch (error) {
            console.log(error);
        }
    },
    methods: {
        submitCreate: async function () {
            try {
                let response = await ContactService.createContact(this.contact);
                if (response) {
                    alert("Added Successfully");
                    return this.$router.push('/');
                }
                else {
                    return this.$router.push('/contacts/add');
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        addField() {
            this.contact.skills.push("");
        },
        removeField(index) {
            this.contact.skills.splice(index, 1);
        }
    }
}
</script>
  
<style scoped></style>