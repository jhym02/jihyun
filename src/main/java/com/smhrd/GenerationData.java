package com.smhrd;

public class GenerationData {

    private String hour;
    private double powerGeneration;
    private double cumulativePower;
    private double solarRadiation;
    private double temperature;
    private double windSpeed;

    // Getters and Setters
    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public double getPowerGeneration() {
        return powerGeneration;
    }

    public void setPowerGeneration(double powerGeneration) {
        this.powerGeneration = powerGeneration;
    }

    public double getCumulativePower() {
        return cumulativePower;
    }

    public void setCumulativePower(double cumulativePower) {
        this.cumulativePower = cumulativePower;
    }

    public double getSolarRadiation() {
        return solarRadiation;
    }

    public void setSolarRadiation(double solarRadiation) {
        this.solarRadiation = solarRadiation;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }
}
