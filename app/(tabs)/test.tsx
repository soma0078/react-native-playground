import { Button, StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useState } from "react";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#8AC0F2", dark: "#2F3E4C" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.mono,
          }}
        >
          Test Page
        </ThemedText>
      </ThemedView>
      <ThemedText>Let&apos;s play React Native!</ThemedText>

      <MenuList />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

const MENUS = [
  { menu: "espresso" },
  { menu: "matcha latte" },
  { menu: "vanilla latte" },
];

interface Menu {
  menu: string;
  onSelect: (menu: string) => void;
  isSelected: boolean;
}

export const MenuItem = ({ menu, onSelect, isSelected }: Menu) => {
  return (
    <TouchableOpacity onPress={() => onSelect(menu)}>
      <ThemedView
        style={[menuStyles.menuItem, isSelected && { backgroundColor: "gray" }]}
      >
        <ThemedText
          style={{
            fontFamily: Fonts.mono,
            fontWeight: isSelected ? "bold" : "normal",
          }}
        >
          ☕️ {menu}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

export const MenuList = () => {
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);

  const handleSelect = (menu: string) => {
    setSelectedMenus((prev) => {
      if (!prev.includes(menu)) {
        return [...prev, menu];
      }
      return prev;
    });
  };

  const handleDeleteMenu = (menuToDelete: string) => {
    setSelectedMenus((prev) => prev.filter((menu) => menu !== menuToDelete));
  };

  const handleSubmit = (selectedMenus: string[]) => {
    alert("Now " + selectedMenus + " is(are) ordered!");
  };

  return (
    <>
      <ThemedView style={menuStyles.menuList}>
        {MENUS.map((m) => (
          <MenuItem
            key={m.menu}
            menu={m.menu}
            onSelect={handleSelect}
            isSelected={selectedMenus.includes(m.menu)}
          />
        ))}
      </ThemedView>

      <ThemedView style={{ marginTop: 20 }}>
        <ThemedText style={{ marginBottom: 10 }}>📋 Selected Items:</ThemedText>
        <ThemedView style={menuStyles.selectedContainer}>
          {selectedMenus.length > 0 ? (
            selectedMenus.map((menu) => (
              <TouchableOpacity
                key={menu}
                style={menuStyles.chip}
                onPress={() => handleDeleteMenu(menu)}
              >
                <ThemedText style={menuStyles.chipText}>{menu}</ThemedText>
                <IconSymbol name="xmark" size={18} color="#666" />
              </TouchableOpacity>
            ))
          ) : (
            <ThemedText style={{ color: "gray", fontStyle: "italic" }}>
              Nothing yet...
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>

      <Button title="orderd" onPress={() => handleSubmit(selectedMenus)} />
    </>
  );
};

const menuStyles = StyleSheet.create({
  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  menuList: { display: "flex", flexDirection: "column", gap: 8 },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    fontFamily: Fonts.mono,
  },
});
