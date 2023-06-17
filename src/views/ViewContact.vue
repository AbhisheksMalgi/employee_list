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
          <p class="h3 text-center fw-bold">Details</p>
        </div>
      </div>
    </div>
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

    <div class="container" v-if="!loading && isDone">
      <div class="row align-items-center">
        <div class="col-md-6">
          <ul class="list-group">
            <li class="list-group-item">
              Name : <span class="fw-bold">{{ contact.firstName }}</span>
              <div class="text-end">
                <button class="btn btn-lg" :class="{ 'btn-success': !contact.active, 'btn-danger': contact.active }"
                  @click="toggleAvailability(!contact.active)">
                </button>
              </div>
            </li>
            <li class="list-group-item">
              Last Name : <span class="fw-bold">{{ contact.lastName }}</span>
            </li>
            <li class="list-group-item">
              Field of Employment :
              <span class="fw-bold">{{ contact.department }}</span>
            </li>
            <li class="list-group-item">Skills: <span class="fw-bold">
                <ul>
                  <li v-for="(skill, index) in contact.skills" :key="index">{{ skill }}</li>
                </ul>
              </span></li>
            <li class="list-group-item">
              About : <span class="fw-bold">{{ contact.info }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-1 d-flex flex align-items-center">
      <RouterLink :to="`/contacts/edit/${contact.id}`" class="btn btn-primary ms-3">Edit
      </RouterLink>
      <button class="btn btn-primary ms-2 my-2" @click="clickDeleteContact(contact.id)">Delete
      </button>
    </div>
  </div>
</template>

<script>
import { ContactService } from "@/services/ContactService";
import Spinner from "../components/Spinner.vue";
import axios from "axios";

export default {
  components: { Spinner },
  name: "ViewContact",
  data: function () {
    return {
      contactId: this.$route.params.contactId,
      loading: false,
      contact: {},
      errorMessage: null,
    };
  },
  created: async function () {
    try {
      this.loading = true;
      let response = await ContactService.getContact(this.contactId);
      this.contact = response.data;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }
  },
  methods: {
    isDone: function () {
      return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
    },
    clickDeleteContact: async function (contactId) {
      try {
        this.loading = true;
        let response = await ContactService.deleteContact(contactId);
        if (response) {
          alert("Deleated Successfully");
          let response = await ContactService.getAllContacts();
          this.contacts = response.data;
          this.loading = false;
          return this.$router.push('/');
        }
      } catch (error) {
        this.errorMessage = error;
        this.loading = false;
      }
    },
    toggleAvailability: function (status) {
      axios.patch(`http://localhost:9000/contacts/${this.contactId}`, { active: status })
      window.location.reload();
    }
  },
}
</script>

<style scoped></style>
