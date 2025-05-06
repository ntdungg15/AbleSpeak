package com.uet.longhoang.engapp.services.interfaces;
import com.uet.longhoang.engapp.entities.DictionaryEntry;

import java.io.IOException;

public interface IDictionaryService {
    String translate(String from, String to, String text) throws IOException;
    DictionaryEntry[] getDefinition(String word);
}

