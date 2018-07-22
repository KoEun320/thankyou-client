## 클라이언트
- render 밖에서 페이지 이동시키고 싶을때
    container에 withRouter써서 연결

        import { withRouter } from 'react-router-dom';

        const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
        export default AppContainer;

    쓸때는?
        <Route render={(props)=>{return(<main {...props}>)}}>
        this.props.history.push('/login');

## 비동기
- 비동기 예를들어 ajax호출시, 컨테이너에서 하는게 좋다. 가장 기본적인 작업은 컨테이너에서 하고 그다음에 액션

- 여기서 props, state바뀌는거 감지해서 체크할수 있음.
shouldComponentUpdate (preA, preB) {

        debugger
        return true;
}


-- setState에 두번째 인자는  콜백
