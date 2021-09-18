<script>
  import { Router, basepath } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  // $basepath = "/public/";
  const routifyConfig = {
    urlTransform: {
      apply: (url) => url, // external URL
      remove: (url) => {
        const partialUrl = `/pages/benlubas/who`;
        return url.replace(partialUrl, "");
      }, //internal URL
    },
    useHash: true,
  };
</script>

<Router {routes} config={routifyConfig} />
