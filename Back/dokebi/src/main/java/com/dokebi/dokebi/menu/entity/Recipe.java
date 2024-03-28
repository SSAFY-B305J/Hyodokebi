package com.dokebi.dokebi.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Recipe")
@Entity
public class Recipe {

    @Id
    @Column(name="recipe_id")
    private int recipeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mi_id", referencedColumnName = "mi_id")
    private Mi mi;

    @Builder
    public Recipe(int recipeId, Menu menu, Mi mi) {
        this.recipeId = recipeId;
        this.menu = menu;
        this.mi = mi;
    }
}

