class NewsStandModel {
  constructor() {
    this.mediaType = "total";
    this.viewType = "list";
  }
  setMediaType(type) {
    this.mediaType = type;
  }

  getMediaType() {
    return this.mediaType;
  }

  setViewType(type) {
    this.viewType = type;
  }

  getViewType() {
    return this.viewType;
  }
}

export default new NewsStandModel();