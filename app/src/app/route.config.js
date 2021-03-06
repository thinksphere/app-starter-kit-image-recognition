/**
 * RouteConfigクラス (実際にはクラスとして作成しても、appModule.config(obj)の引数に指定できるのはファクトリ関数オブジェクトでしかない。
 * そのため、本来的にはクラスとして作成する必要も意味はないが、統一性のためあえてクラス化している。
 */
class RouteConfig {

    /**
     * コンストラクタ
     */
    constructor($stateProvider, $urlRouterProvider) {

        /*
         * home
         */
        $stateProvider.state('home', {
            url: '/',
            views: {
                'header': {
                    template: require('./view/header/header.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                },
                'sidepanel': {
                    template: require('./view/sidepanel/sidepanel-menu_01.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                },
                'content': {
                    //template: require('./view/content/content-default.html'),
                    template: require('./view/content/content-default.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                },
                'footer': {
                    template: require('./view/footer/footer.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                }
            }
        });

        /*
         * メニュー01 (最上位トップ)
         */
        $stateProvider.state('menu_01', {
            url: "/menu_01",
            views: {
                'header': {
                    template: require('./view/header/header.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                },
                'sidepanel': {
                    template: require('./view/sidepanel/sidepanel-menu_01.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                },
                'content': {
                    template: require('./view/content/content-menu_01-top.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                },
                'footer': {
                    template: require('./view/footer/footer.html'),
                    controller: 'MainController',
                    controllerAs: 'controller'
                }
            }
        });

        /*
         * メニュー01 > サブメニュー01
         */
        $stateProvider.state('menu_01.01', {
            url: "/menu_01_01",
            views: {
                'content@': {
                    template: require('./view/content/content-watson-visualrecognition-classifiers-list.html'),
                    controller: 'WatsonVisualRecognitionClassifierListController',
                    controllerAs: 'controller'
                }
            }
        });

        /*
         * メニュー01 > サブメニュー02
         */
        $stateProvider.state('menu_01.02', {
            url: "/menu_01_02",
            views: {
                'content@': {
                    template: require('./view/content/content-watson-visualrecognition-new-classifier.html'),
                    controller: 'WatsonVisualRecognitionNewClassifierController',
                    controllerAs: 'controller'
                }
            }
        });

        /*
         * メニュー01 > サブメニュー03
         */
        $stateProvider.state('menu_01.03', {
            url: "/menu_01_03",
            views: {
                'content@': {
                    template: require('./view/content/content-watson-visualrecognition-image-classification.html'),
                    controller: 'WatsonVisualRecognitionImageClassificationController',
                    controllerAs: 'controller'
                }
            }
        });

        //状態が設定されていない場合、url'/'を表示するようにセット(state[home]と同じ)
        //定義されてない url がリクエストされたら '/' （つまり main）に遷移
        $urlRouterProvider.otherwise('/');
    }

    /**
     * 初期化用 activate関数(インジェクション用)
     */
    static activate($stateProvider, $urlRouterProvider) {
        RouteConfig.instance = new RouteConfig($stateProvider, $urlRouterProvider);
        return RouteConfig.instance;
    }
}

// 下記をRouteConfig.$inject = ...にするとng-strict-diでのエラーになるので注意
RouteConfig.activate.$inject = ['$stateProvider', '$urlRouterProvider'];
export default RouteConfig;


//以下のように、function自体を exportするコーディングをしても同じ意味だが、あくまでクラスベースで開発を進めたいのでそうしている
//
// export default function($stateProvider, $urlRouterProvider)  {
//   'ngInject';
//   $urlRouterProvider.otherwise( '/' );
// }
