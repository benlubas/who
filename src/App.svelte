<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";

  const config = {
    urlTransform: {
      apply: (url) => url, // external URL
      remove: (url) => {
        return url.replace("/", "/");
      }, //internal URL
    },
    useHash: true,
  };
</script>

<Router {routes} {config} />
