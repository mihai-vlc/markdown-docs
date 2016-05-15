define(['app/views/header-view'], function (HeaderView) {
    describe('Header', function() {

        it('should load the header view', function() {
            expect(HeaderView).toBeDefined();
        });

        it('should call the render method on init', function() {
            spyOn(HeaderView.prototype, 'render');

            var headerView = new HeaderView();

            expect(HeaderView.prototype.render).toHaveBeenCalled();
        });

        it('should have a template', function() {
            expect(HeaderView.prototype.template).toBeDefined();
        });


    });
});

