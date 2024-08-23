package com.smhrd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.GenerationData;
import com.smhrd.GenerationDataService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GenerationDataController {

    @Autowired
    private GenerationDataService generationDataService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(value = "/generationDataServlet", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getGenerationData() throws Exception {
        List<GenerationData> data = generationDataService.getGenerationData();
        return objectMapper.writeValueAsString(data);
    }
}
