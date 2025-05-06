package com.uet.longhoang.engapp.engapp.services.impls;

import com.uet.longhoang.engapp.engapp.entities.Dialogue;
import com.uet.longhoang.engapp.engapp.repositories.DialogueRepository;
import com.uet.longhoang.engapp.engapp.services.interfaces.IDialogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DialogueService implements IDialogueService {
    @Autowired
    private DialogueRepository dialogueRepository;
    @Override
    public List<Dialogue> getAllDialogues() {
        return dialogueRepository.findAll();
    }
}
