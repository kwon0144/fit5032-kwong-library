
<template>
    <div class="about">
        <h1>🗄️ W5. Library Registration Form</h1>
        <p>Let's build some more advanced features into our forum.</p>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" 
                              @blur="() => validateName(true)"
                              @input="() => validateName(false)" 
                            v-model="formData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-6 ">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" 
                              @blur="() => validateGender(true)"
                              @input="() => validateGender(false)"
                            v-model="formData.gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{  errors.gender }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" 
                              @blur="() => validatePassword(true)"
                              @input="() => validatePassword(false)"
                            v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{  errors.password }}</div>
                        </div>
                        <div class="col-6">
                            <label for="confirm-password" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirm-password" 
                              @blur="() => validateConfirmPassword(true)"
                              @input="() => validateConfirmPassword(false)"
                            v-model="formData.confirmPassword">
                            <div v-if="errors.confirmPassword" class="text-danger">{{  errors.confirmPassword }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" rows="3" 
                            @blur="() => validateReason(true)"
                            @input="() => validateReason(false)"
                        v-model="formData.reason"></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                        <div v-else-if="messages.reason" class="text-success">{{ messages.reason }}</div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Suburb</label>
                        <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <h3 class="mt-5">This is a Primevue Database</h3>
    <div>
        <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="isAustralian" header="Australian Residence"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
        </DataTable>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    
    const formData = ref({
        username: '',
        password: '',
        confirmPassword: '',
        isAustralian: false,
        reason: '',
        gender: '',
        suburb: 'Clayton'
    });
    
    const submittedCards = ref([]);
    
    const submitForm = () => {
        validateName(true);
        validatePassword(true);
        validateConfirmPassword(true);
        validateGender(true);
        validateReason(true);
        if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword
            && !errors.value.gender && !errors.value.reason) {
            submittedCards.value.push({ ...formData.value });
            clearForm()
        }
    };

    const clearForm = () =>{
    // clear the data
    formData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        isAustralian: false,
        reason: '',
        gender: '',
        suburb: ''
    };
  }

    const errors = ref({
        username: null,
        password: null,
        confirmPassword: null,
        resident: null,
        gender: null,
        reason: null,
        suburb: null
    });

    const messages = ref({
        reason: null
    })

    const validateName = (blur) => {
        if(formData.value.username.length < 3){
            if (blur) errors.value.username = "Name must be at least 3 characters.";
        } else {
            errors.value.username = null;
        }
    };

    const validatePassword = (blur) => {
        const password = formData.value.password;
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#\$%\^&\*\(\),\.\:\{\}\|<>\?]/.test(password);

        if (password.length < minLength) {
            if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
        } else if (!hasUppercase) {
            if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
        } else if (!hasLowercase) {
            if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
        } else if (!hasNumber) {
            if (blur) errors.value.password = "Password must contain at least one number.";
        } else if (!hasSpecialChar) {
            if (blur) errors.value.password = "Password must contain at least one special character.";
        } else {
            errors.value.password = null;
        }
    };

    const validateConfirmPassword = (blur) => {
        if (formData.value.confirmPassword !== formData.value.password){
            if (blur) errors.value.confirmPassword = 'Passwords do not match.'
        } else {
            errors.value.confirmPassword = null;
        }
    }

    const validateGender = (blur) => {
        if(formData.value.gender === ''){
            if (blur) errors.value.gender = "Please select an item in the list.";
        } else {
            errors.value.gender = null;
        }
    };

    const validateReason = (blur) => {
    if (formData.value.reason === '') {
        if (blur) errors.value.reason = "Please fill in this field.";
    } else if (formData.value.reason.length < 10) {
        errors.value.reason = "Input must be at least 10 characters.";
    } else {
        errors.value.reason = null;
        if (formData.value.reason.toLowerCase().includes('friend')) {
            messages.value.reason = "Great to have a friend";
        } else {
            messages.value.reason = null;
        }
    }
};

</script>