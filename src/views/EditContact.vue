<template>
    <div>
        <div class="row mt-3">
            <div class="col">
                <router-link to="/" class="btn btn-primary ms-3">Back</router-link>
            </div>
        </div>
        <div class="container mt-3">
            <div class="row">
                <div class="col">
                    <p class="h3 text-center fw-bold">Edit</p>
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
                            <input v-model="contact.fieldofemployment" type="text" class="form-control"
                                placeholder="Field of Employment">
                        </div>
                        <div v-for="(skill, index) in contact.skills" :key="index">
                            <label>Skill {{ index + 1 }}</label>
                            <input class="ms-2 my-1" type="text" v-model="contact.skills[index]" placeholder="Enter skill">
                            <button class="btn btn-sm btn-primary ms-1" type="button" @click="removeField(index)"
                                v-show="index > 0">Remove</button>
                        </div>
                        <button class="btn btn-sm btn-primary my-2" type="button" @click="addField">Add Skill</button>
                        <div class="mb-2">
                            <input v-model="contact.about" type="text" class="form-control" placeholder="About">
                        </div>
                        <div class="mb-2">
                            <input type="submit" class="btn btn-primary" value="Update">
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
    data: function () {
        return {
            contactId: this.$route.params.contactId,
            loading: false,
            contact: {
                name: '',
                lastname: '',
                fieldofemployment: '',
                about: '',
            },
            errorMessage: null,
        }
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getContact(this.contactId);
            this.contact = response.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.this.loading = false;
        }
    },
    methods: {
        updateSubmit: async function () {
            try {
                let response = await ContactService.updateContact(this.contact, this.contactId);
                if (response) {
                    alert("Updated Successfully");
                    return this.$router.push(`/contacts/edit/${this.contactId}`);
                }
                else {
                    return this.$router.push(`/contacts/edit/${this.contactId}`);
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