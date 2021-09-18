<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";

  const routifyConfig = {
    urlTransform: {
      apply: (url) => url, // external URL
      remove: (url) => {
        return url.replace("/who/", "/");
      }, //internal URL
    },
    useHash: true,
  };
</script>

<Router {routes} config={routifyConfig} />
