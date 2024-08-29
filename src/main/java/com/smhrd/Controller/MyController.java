package com.smhrd.Controller;

import com.smhrd.entity.HourlyData;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MyController {

    @GetMapping("/dataTable")
    public List<HourlyData> showHourlyDataTable(Model model, HourlyData data) {
        List<HourlyData> hourlyDataList = new ArrayList<>();

        for (int hour = 0; hour < 24; hour++) {
            data.setHour(hour);
            data.setPowerGeneration(data.getPowerGeneration());
            data.setCumulativePower(data.getCumulativePower());
            data.setSolarRadiation(data.getSolarRadiation());
            data.setTemperature(data.getTemperature());
            data.setWindSpeed(data.getWindSpeed());
            data.setTm_pg(data.getTm_pg());
            data.setTm_cp(data.getTm_cp());
            data.setTm_s(data.getTm_s());
            data.setTm_tme(data.getTm_tme());
            data.setTm_w(data.getTm_w());
            hourlyDataList.add(data);
        }

        model.addAttribute("hourlyDataList", hourlyDataList);
        return hourlyDataList;
    }
}