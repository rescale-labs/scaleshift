FROM supinf/swagger-codegen:2.3

RUN apk --no-cache add nodejs yarn \
    && yarn global add browserify uglify-js

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

VOLUME /spec
ENTRYPOINT ["/entrypoint.sh"]
