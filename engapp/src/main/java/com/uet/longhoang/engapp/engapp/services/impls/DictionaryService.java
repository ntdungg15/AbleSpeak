package com.uet.longhoang.engapp.engapp.services.impls;

import com.uet.longhoang.engapp.engapp.TranslationUtil;
import com.uet.longhoang.engapp.engapp.services.interfaces.IDictionaryService;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DictionaryService implements IDictionaryService {

    @Override
    public String translate(String from, String to, String text) throws IOException {
        return TranslationUtil.translate(from, to, text);
    }
}
