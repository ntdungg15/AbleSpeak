package com.uet.longhoang.engapp.engapp.controllers;

import com.uet.longhoang.engapp.engapp.entities.Dialogue;
import com.uet.longhoang.engapp.engapp.services.impls.DialogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/list")
public class DialogueController {
    @Autowired
    DialogueService dialogueService;
    @GetMapping("/dialogue")
    public List<Dialogue> getDialogues() {
        return dialogueService.getAllDialogues();
    }
}
