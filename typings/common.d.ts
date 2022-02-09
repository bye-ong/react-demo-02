declare module "common-interface" {
  export interface ICommon {
    customSidebar: boolean;
    isLoading: boolean;
    locale: string;
    localeData: object;
    userAgent: string;
    project: string;
    projectList: Array<object>;
    user: object;
    domainContext: object;
    validationInfo: object;
    initSearch: object;
    initBlockList: "WAIT" | "SUCCESS" | "ERROR";
    initVnc: boolean;
    menu: Array<object>;
    systemMenuList: Array<object>;
    systemMenu: string;
    socketConnectMessage: {
      success: "WAIT" | "SUCCESS" | "ERROR";
      data: any;
    };
  }
}
