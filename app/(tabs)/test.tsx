import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useMenus, useSubmitOrder } from "@/features/menu/queries";

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

interface MenuItemProps {
  menu: string;
  onSelect: (menu: string) => void;
  isSelected: boolean;
}

export const MenuItem = ({ menu, onSelect, isSelected }: MenuItemProps) => {
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
  const { data: menus, isLoading, error } = useMenus();
  const submitOrderMutation = useSubmitOrder();

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

  const handleSubmit = () => {
    if (selectedMenus.length === 0) {
      Alert.alert("알림", "메뉴를 선택해주세요.");
      return;
    }

    submitOrderMutation.mutate(
      { items: selectedMenus },
      {
        onSuccess: (response) => {
          Alert.alert("주문 완료", response.message);
          setSelectedMenus([]);
        },
        onError: (err) => {
          Alert.alert("오류", err.message);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <ThemedView style={menuStyles.loadingContainer}>
        <ActivityIndicator size="large" />
        <ThemedText>메뉴를 불러오는 중...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText style={{ color: "red" }}>
          메뉴를 불러오지 못했습니다: {error.message}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <ThemedView style={menuStyles.menuList}>
        <SectionList
          sections={menus || []}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <MenuItem
              menu={item.menu}
              onSelect={handleSelect}
              isSelected={selectedMenus.includes(item.menu)}
            />
          )}
          renderSectionHeader={({ section: { category } }) => (
            <ThemedText style={menuStyles.category}>{category}</ThemedText>
          )}
        />
      </ThemedView>

      <ThemedView style={{ marginTop: 20 }}>
        <ThemedText style={{ marginBottom: 10 }}>📋 Selected Items:</ThemedText>
        <ThemedView style={menuStyles.selectedContainer}>
          {selectedMenus.length > 0 ? (
            selectedMenus.map((item, index) => (
              <TouchableOpacity
                key={item + index}
                style={menuStyles.chip}
                onPress={() => handleDeleteMenu(item)}
              >
                <ThemedText style={menuStyles.chipText}>{item}</ThemedText>
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

      <Button
        title={submitOrderMutation.isPending ? "주문 중..." : "Order"}
        onPress={handleSubmit}
        disabled={submitOrderMutation.isPending}
      />
    </>
  );
};

const menuStyles = StyleSheet.create({
  category: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: Fonts.mono,
  },
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
    paddingHorizontal: 8,
    gap: 6,
    borderColor: "#e0e0e0",
    borderRadius: 16,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontFamily: Fonts.mono,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 10,
    padding: 20,
  },
});
