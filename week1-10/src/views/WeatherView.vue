<template>
    <div class="container">
        <div class="header">
            <h1>WEATHER APP</h1>
            <div class="search-bar">
                <input type="text" v-model="city" placeholder="Enter city name" class="search-input"/>
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
        </div>
    </div>
    <main>
        <div v-if="weatherData" >
            <h2 class="weather-details">
                {{  weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div class="weather-details">
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ temperature }} °C</p>
            </div >
            <span class="weather-details">{{ weatherData.weather[0].description }}</span>
        </div>
    </main>
</template>

<script>
    import axios from "axios";
    
    const apikey = "dc168a39943cd29889441c0c8bd65762"

    export default {
        name: "App",
        data() {
            return {
                city: "",
                weatherData: null,
                hourlyForecast: [],
                dailyForecase: [],
            };
        },
        computed: {
            temperature() {
                return this.weatherData
                    ? Math.floor(this.weatherData.main.temp - 273)
                    : null;
            },
            iconUrl(){
                return this.weatherData
                    ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
                    : null;
            },
        },
        mounted() {
            this.fetchCurrentLocationWeather();
        },
        methods: {
            async fetchCurrentLocationWeather() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const { latitude, longitude } = position.coords;
                        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                        await this.fetchWeatherData(url);
                    });
                }
            },
            async fetchWeatherData(url) {
                try {
                    const response = await axios.get(url);
                    this.weatherData = response.data;
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            },
            async searchByCity() {
                if (this.city) {
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
                await this.fetchWeatherData(url);
            }
            }
        }

    }

</script>

<style scope>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .weather-details {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        text-align: center;
    }
</style>


