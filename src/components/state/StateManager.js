import { VIEW_TYPES } from "../../constants/constants";

const State = {
  common: {
    currentView: VIEW_TYPES.TOTAL,
    tabsContainer: null
  },
  subscribed: {
    currentPage: 1,
    totalPages: 1
  },
  total: {
    activeTabIndex: 0,
    pageCount: 1
  }
}

function createGetter(obj, key) {
  return () => obj[key];
}

function createSetter(obj, key) {
  return (value) => obj[key] = value;
}

function createAccessors(stateObj) {
  const accessors = {};
  for (const [category, properties] of Object.entries(stateObj)) {
    for (const key of Object.keys(properties)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      const getterName = `get${capitalizedKey}`;
      const setterName = `set${capitalizedKey}`;
      accessors[getterName] = createGetter(stateObj[category], key);
      accessors[setterName] = createSetter(stateObj[category], key);
    }
  }
  return accessors;
}

const StateAccessors = createAccessors(State);

// DOM 관련 setter 따로 처리
StateAccessors.setTabsContainer = (container) => {
  if (!(container instanceof Element)) {
    throw new Error("유효하지 않은 컨테이너 요소입니다.");
  }
  State.common.tabsContainer = container;
};

export const {
  getCurrentView,
  setCurrentView,
  getTabsContainer,
  setTabsContainer,
  getCurrentPage: getSubCurrentPage,
  setCurrentPage: setSubCurrentPage,
  getTotalPages: getSubTotalPages,
  setTotalPages: setSubTotalPages,
  getActiveTabIndex: getTotalActiveTabIndex,
  setActiveTabIndex: setTotalActiveTabIndex,
  getPageCount: getTotalPageCount,
  setPageCount: setTotalPageCount
} = StateAccessors;