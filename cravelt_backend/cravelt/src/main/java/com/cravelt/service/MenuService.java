package com.cravelt.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cravelt.model.Menu;
import com.cravelt.model.MenuItem;
import com.cravelt.repository.MenuItemRepository;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public Menu getMenuByRestaurantId(String restaurantId) {

        List<MenuItem> items = menuItemRepository.findByRestaurantId(restaurantId);

        Menu menu = new Menu();
        menu.setRestaurantId(restaurantId);
        menu.setItems(items != null ? items : new ArrayList<>());

        return menu;
    }

    public MenuItem saveMenuItem(MenuItem item) {
        return menuItemRepository.save(item);
    }
}