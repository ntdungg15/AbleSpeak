package com.uet.longhoang.engapp.engapp.services.impls;

import com.uet.longhoang.engapp.engapp.entities.DictionaryEntry;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class DictionaryService {

    private static final String API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    @Autowired
    private RestTemplate restTemplate;

    public DictionaryEntry[] getDefinition(String word) {
        String url = API_URL + word;
        return restTemplate.getForObject(url, DictionaryEntry[].class);
    }
}