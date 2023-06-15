<template>
    <div>
        <h1 class="fw-bold text-center">Home View</h1>
        <div v-if="loading">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <spinner />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!loading && errorMessage">
            <div class="container mt-3">
                <div class="row">
                    <div class="col">
                        <p class="h4 text-danger fw-bold">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-3" v-if="contacts.length > 0">
            <div class="row">
                <div class="col-md-6" v-for="contacts of contacts" :key="contacts">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <RouterLink :to="`/contacts/view/${contacts.id}`" class="btn">
                                <div class="col-sm-7">
                                    <ul class="list-group" :style="cardBorderStyle(contacts.available)">
                                        <li class="list-group-item">
                                            Name : <span class="fw-bold">{{ contacts.name }}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Last Name :
                                            <span class="fw-bold">{{ contacts.lastname }}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Field of Employment :
                                            <span class="fw-bold">{{
                                                contacts.fieldofemployment
                                            }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-3 fixed-bottom">
            <div class="row">
                <div class="col">
                    <RouterLink to="/contacts/add" class="btn w-100 btn-primary" id="btn">Add</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from "@/services/ContactService";
import Spinner from "../components/Spinner.vue";

export default {
    components: { Spinner },
    name: "ContactManager",
    data: function () {
        return {
            loading: false,
            contacts: [],
            errorMessage: null,
        };
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
        } catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    methods: {
        cardBorderStyle: function (status) {
            return {
                border: status ? "3px solid green" : "3px solid red"
            };
        }
    },
};
</script>

<style scoped></style>
