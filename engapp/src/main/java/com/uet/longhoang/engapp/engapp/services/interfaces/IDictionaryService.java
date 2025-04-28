package com.uet.longhoang.engapp.engapp.services.interfaces;

import java.io.IOException;

public interface IDictionaryService {
    public String translate(String from, String to,String text) throws IOException;
}
