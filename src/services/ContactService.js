import axios from "axios";

export class ContactService {
  static severURL = `http://localhost:9000`;

  static getAllContacts() {
    let dataURL = `${this.severURL}/contacts`;
    return axios.get(dataURL);
  }

  static getContact(contactId) {
    let dataURL = `${this.severURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  }

  static createContact(contact) {
    let dataURL = `${this.severURL}/contacts/`;
    return axios.post(dataURL, contact);
  }

  static updateContact(contact, contactId) {
    let dataURL = `${this.severURL}/contacts/${contactId}`;
    return axios.put(dataURL, contact);
  }

  static deleteContact(contactId) {
    let dataURL = `${this.severURL}/contacts/${contactId}`;
    return axios.delete(dataURL);
  }

  static getAllGroups() {
    let dataURL = `${this.severURL}/groups/`;
    return axios.get(dataURL);
  }
  static getGroup(contact) {
    let groupId = contact.groupId;
    let dataURL = `${this.severURL}/groups/${groupId}`;
    return axios.get(dataURL);
  }
}
