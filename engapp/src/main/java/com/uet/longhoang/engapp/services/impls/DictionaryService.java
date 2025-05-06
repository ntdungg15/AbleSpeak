package com.uet.longhoang.engapp.services.impls;

import com.uet.longhoang.engapp.TranslationUtil;
import com.uet.longhoang.engapp.entities.DictionaryEntry;
import com.uet.longhoang.engapp.services.interfaces.IDictionaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class DictionaryService implements IDictionaryService {

    private static final String API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String translate(String from, String to, String text) throws IOException {
        return TranslationUtil.translate(from, to, text);
    }

    @Override
    public DictionaryEntry[] getDefinition(String word) {
        String url = API_URL + word;
        return restTemplate.getForObject(url, DictionaryEntry[].class);
    }
}