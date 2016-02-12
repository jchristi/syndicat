CREATE TABLE "ttrss_access_keys" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "access_key" varchar(250) NOT NULL,
  "feed_id" varchar(250) NOT NULL,
  "is_cat" tinyint(1) NOT NULL DEFAULT '0',
  "owner_uid" int(11) NOT NULL,
  PRIMARY KEY ("id")
  /*,KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_archived_feeds" (
  "id" int(11) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  "title" varchar(200) NOT NULL,
  "feed_url" text NOT NULL,
  "site_url" varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
  /*,KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_cat_counters_cache" (
  "feed_id" int(11) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  "value" int(11) NOT NULL DEFAULT '0',
  "updated" datetime NOT NULL
  /*,KEY "ttrss_cat_counters_cache_owner_uid_idx" ("owner_uid")*/
);

CREATE TABLE "ttrss_counters_cache" (
  "feed_id" int(11) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  "value" int(11) NOT NULL DEFAULT '0',
  "updated" datetime NOT NULL
  /*,KEY "ttrss_counters_cache_feed_id_idx" ("feed_id"),
/*KEY "ttrss_counters_cache_owner_uid_idx" ("owner_uid"),*/
/*KEY "ttrss_counters_cache_value_idx" ("value")*/
);

CREATE TABLE "ttrss_enclosures" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "content_url" text NOT NULL,
  "content_type" varchar(250) NOT NULL,
  "post_id" int(11) NOT NULL,
  "title" text NOT NULL,
  "duration" text NOT NULL,
  "width" int(11) NOT NULL DEFAULT '0',
  "height" int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
  /*,KEY "post_id" ("post_id"),
/*KEY "ttrss_enclosures_post_id_idx" ("post_id")*/
);

CREATE TABLE "ttrss_entries" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "title" text NOT NULL,
  "guid" varchar(255) NOT NULL,
  "link" text NOT NULL,
  "updated" datetime NOT NULL,
  "content" longtext NOT NULL,
  "content_hash" varchar(250) NOT NULL,
  "cached_content" longtext,
  "no_orig_date" tinyint(1) NOT NULL DEFAULT '0',
  "date_entered" datetime NOT NULL,
  "date_updated" datetime NOT NULL,
  "num_comments" int(11) NOT NULL DEFAULT '0',
  "plugin_data" longtext,
  "comments" varchar(250) NOT NULL DEFAULT '',
  "author" varchar(250) NOT NULL DEFAULT '',
  "lang" varchar(2) DEFAULT NULL,
  PRIMARY KEY ("id")
/*UNIQUE KEY "guid" ("guid"),*/
/*KEY "ttrss_entries_date_entered_index" ("date_entered"),*/
/*KEY "ttrss_entries_guid_index" ("guid"),*/
/*KEY "ttrss_entries_updated_idx" ("updated")*/
);

CREATE TABLE "ttrss_entry_comments" (
  "id" int(11) NOT NULL,
  "ref_id" int(11) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  "private" tinyint(1) NOT NULL DEFAULT '0',
  "date_entered" datetime NOT NULL,
  PRIMARY KEY ("id")
/*KEY "ref_id" ("ref_id"),*/
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_error_log" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "owner_uid" int(11) DEFAULT NULL,
  "errno" int(11) NOT NULL,
  "errstr" text NOT NULL,
  "filename" text NOT NULL,
  "lineno" int(11) NOT NULL,
  "context" text NOT NULL,
  "created_at" datetime NOT NULL,
  PRIMARY KEY ("id")
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_feedbrowser_cache" (
  "feed_url" text NOT NULL,
  "site_url" text NOT NULL,
  "title" text NOT NULL,
  "subscribers" int(11) NOT NULL
);

CREATE TABLE "ttrss_feeds" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "owner_uid" int(11) NOT NULL,
  "title" varchar(200) NOT NULL,
  "cat_id" int(11) DEFAULT NULL,
  "feed_url" text NOT NULL,
  "icon_url" varchar(250) NOT NULL DEFAULT '',
  "update_interval" int(11) NOT NULL DEFAULT '0',
  "purge_interval" int(11) NOT NULL DEFAULT '0',
  "last_updated" datetime DEFAULT '0000-00-00 00:00:00',
  "last_error" varchar(250) NOT NULL DEFAULT '',
  "site_url" varchar(250) NOT NULL DEFAULT '',
  "auth_login" varchar(250) NOT NULL DEFAULT '',
  "auth_pass" varchar(250) NOT NULL DEFAULT '',
  "parent_feed" int(11) DEFAULT NULL,
  "private" tinyint(1) NOT NULL DEFAULT '0',
  "rtl_content" tinyint(1) NOT NULL DEFAULT '0',
  "hidden" tinyint(1) NOT NULL DEFAULT '0',
  "include_in_digest" tinyint(1) NOT NULL DEFAULT '1',
  "cache_images" tinyint(1) NOT NULL DEFAULT '0',
  "hide_images" tinyint(1) NOT NULL DEFAULT '0',
  "cache_content" tinyint(1) NOT NULL DEFAULT '0',
  "auth_pass_encrypted" tinyint(1) NOT NULL DEFAULT '0',
  "last_viewed" datetime DEFAULT NULL,
  "last_update_started" datetime DEFAULT NULL,
  "always_display_enclosures" tinyint(1) NOT NULL DEFAULT '0',
  "update_method" int(11) NOT NULL DEFAULT '0',
  "order_id" int(11) NOT NULL DEFAULT '0',
  "mark_unread_on_update" tinyint(1) NOT NULL DEFAULT '0',
  "update_on_checksum_change" tinyint(1) NOT NULL DEFAULT '0',
  "strip_images" tinyint(1) NOT NULL DEFAULT '0',
  "view_settings" varchar(250) NOT NULL DEFAULT '',
  "pubsub_state" int(11) NOT NULL DEFAULT '0',
  "favicon_last_checked" datetime DEFAULT NULL,
  "favicon_avg_color" varchar(11) DEFAULT NULL,
  "feed_language" varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
  /*KEY "owner_uid" ("owner_uid"),*/
/*KEY "cat_id" ("cat_id"),*/
/*KEY "parent_feed" ("parent_feed"),*/
/*KEY "ttrss_feeds_owner_uid_index" ("owner_uid"),*/
/*KEY "ttrss_feeds_cat_id_idx" ("cat_id")*/
);

CREATE TABLE "ttrss_feed_categories" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "owner_uid" int(11) NOT NULL,
  "title" varchar(200) NOT NULL,
  "collapsed" tinyint(1) NOT NULL DEFAULT '0',
  "order_id" int(11) NOT NULL DEFAULT '0',
  "parent_cat" int(11) DEFAULT NULL,
  "view_settings" varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
/*KEY "parent_cat" ("parent_cat"),*/
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_filters2" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "owner_uid" int(11) NOT NULL,
  "match_any_rule" tinyint(1) NOT NULL DEFAULT '0',
  "enabled" tinyint(1) NOT NULL DEFAULT '1',
  "inverse" tinyint(1) NOT NULL DEFAULT '0',
  "title" varchar(250) NOT NULL DEFAULT '',
  "order_id" int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_filters2_actions" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "filter_id" int(11) NOT NULL,
  "action_id" int(11) NOT NULL DEFAULT '1',
  "action_param" varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
/*KEY "filter_id" ("filter_id"),*/
/*KEY "action_id" ("action_id")*/
);

CREATE TABLE "ttrss_filters2_rules" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "filter_id" int(11) NOT NULL,
  "reg_exp" varchar(250) NOT NULL,
  "inverse" tinyint(1) NOT NULL DEFAULT '0',
  "filter_type" int(11) NOT NULL,
  "feed_id" int(11) DEFAULT NULL,
  "cat_id" int(11) DEFAULT NULL,
  "cat_filter" tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
/*KEY "filter_id" ("filter_id"),*/
/*KEY "filter_type" ("filter_type"),*/
/*KEY "feed_id" ("feed_id"),*/
/*KEY "cat_id" ("cat_id")*/
);

CREATE TABLE "ttrss_filter_actions" (
  "id" int(11) NOT NULL,
  "name" varchar(120) NOT NULL,
  "description" varchar(250) NOT NULL,
  PRIMARY KEY ("id")
/*UNIQUE KEY "name" ("name"),*/
/*UNIQUE KEY "description" ("description")*/
);

CREATE TABLE "ttrss_filter_types" (
  "id" int(11) NOT NULL,
  "name" varchar(120) NOT NULL,
  "description" varchar(250) NOT NULL,
  PRIMARY KEY ("id")
/*UNIQUE KEY "name" ("name"),*/
/*UNIQUE KEY "description" ("description")*/
);

CREATE TABLE "ttrss_labels2" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "owner_uid" int(11) NOT NULL,
  "caption" varchar(250) NOT NULL,
  "fg_color" varchar(15) NOT NULL DEFAULT '',
  "bg_color" varchar(15) NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_linked_feeds" (
  "feed_url" text NOT NULL,
  "site_url" text NOT NULL,
  "title" text NOT NULL,
  "created" datetime NOT NULL,
  "updated" datetime NOT NULL,
  "instance_id" int(11) NOT NULL,
  "subscribers" int(11) NOT NULL
/*KEY "instance_id" ("instance_id")*/
);

CREATE TABLE "ttrss_linked_instances" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "last_connected" datetime NOT NULL,
  "last_status_in" int(11) NOT NULL,
  "last_status_out" int(11) NOT NULL,
  "access_key" varchar(250) NOT NULL,
  "access_url" text NOT NULL,
  PRIMARY KEY ("id")
/*UNIQUE KEY "access_key" ("access_key")*/
);

CREATE TABLE "ttrss_plugin_af_sort_bayes_categories" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "category" varchar(100) NOT NULL DEFAULT '',
  "probability" double NOT NULL DEFAULT '0',
  "owner_uid" int(11) NOT NULL,
  "word_count" bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_plugin_af_sort_bayes_references" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "document_id" varchar(255) NOT NULL,
  "category_id" int(11) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  PRIMARY KEY ("id")
/*KEY "category_id" ("category_id"),*/
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_plugin_af_sort_bayes_wordfreqs" (
  "word" varchar(100) NOT NULL DEFAULT '',
  "category_id" int(11) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  "count" bigint(20) NOT NULL DEFAULT '0'
/*KEY "category_id" ("category_id"),*/
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_plugin_storage" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "name" varchar(100) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  "content" longtext NOT NULL,
  PRIMARY KEY ("id")
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_prefs" (
  "pref_name" varchar(250) NOT NULL,
  "type_id" int(11) NOT NULL,
  "section_id" int(11) NOT NULL DEFAULT '1',
  "access_level" int(11) NOT NULL DEFAULT '0',
  "def_value" text NOT NULL,
  PRIMARY KEY ("pref_name")
/*KEY "type_id" ("type_id"),*/
/*KEY "section_id" ("section_id"),*/
/*KEY "ttrss_prefs_pref_name_idx" ("pref_name")*/
);

CREATE TABLE "ttrss_prefs_sections" (
  "id" int(11) NOT NULL,
  "order_id" int(11) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "ttrss_prefs_types" (
  "id" int(11) NOT NULL,
  "type_name" varchar(100) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "ttrss_sessions" (
  "id" varchar(250) NOT NULL,
  "data" text,
  "expire" int(11) NOT NULL,
  PRIMARY KEY ("id")
/*UNIQUE KEY "id" ("id"),*/
/*KEY "id_2" ("id"),*/
/*KEY "expire" ("expire")*/
);

CREATE TABLE "ttrss_settings_profiles" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "title" varchar(250) NOT NULL,
  "owner_uid" int(11) NOT NULL,
  PRIMARY KEY ("id")
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_tags" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "owner_uid" int(11) NOT NULL,
  "tag_name" varchar(250) NOT NULL,
  "post_int_id" int(11) NOT NULL,
  PRIMARY KEY ("id")
/*KEY "post_int_id" ("post_int_id"),*/
/*KEY "owner_uid" ("owner_uid")*/
);

CREATE TABLE "ttrss_users" (
  "id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "login" varchar(120) NOT NULL,
  "pwd_hash" varchar(250) NOT NULL,
  "last_login" datetime DEFAULT NULL,
  "access_level" int(11) NOT NULL DEFAULT '0',
  "theme_id" int(11) DEFAULT NULL,
  "email" varchar(250) NOT NULL DEFAULT '',
  "full_name" varchar(250) NOT NULL DEFAULT '',
  "email_digest" tinyint(1) NOT NULL DEFAULT '0',
  "last_digest_sent" datetime DEFAULT NULL,
  "salt" varchar(250) NOT NULL DEFAULT '',
  "created" datetime DEFAULT NULL,
  "twitter_oauth" longtext,
  "otp_enabled" tinyint(1) NOT NULL DEFAULT '0',
  "resetpass_token" varchar(250) DEFAULT NULL,
  PRIMARY KEY ("id")
/*UNIQUE KEY "login" ("login"),*/
/*KEY "theme_id" ("theme_id")*/
);

CREATE TABLE "ttrss_user_entries" (
  "int_id" int(11) NOT NULL /*AUTO_INCREMENT*/,
  "ref_id" int(11) NOT NULL,
  "uuid" varchar(200) NOT NULL,
  "feed_id" int(11) DEFAULT NULL,
  "orig_feed_id" int(11) DEFAULT NULL,
  "owner_uid" int(11) NOT NULL,
  "marked" tinyint(1) NOT NULL DEFAULT '0',
  "published" tinyint(1) NOT NULL DEFAULT '0',
  "tag_cache" text NOT NULL,
  "label_cache" text NOT NULL,
  "last_read" datetime DEFAULT NULL,
  "score" int(11) NOT NULL DEFAULT '0',
  "note" longtext,
  "last_marked" datetime DEFAULT NULL,
  "last_published" datetime DEFAULT NULL,
  "unread" tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY ("int_id")
/*KEY "ref_id" ("ref_id"),*/
/*KEY "feed_id" ("feed_id"),*/
/*KEY "orig_feed_id" ("orig_feed_id"),*/
/*KEY "owner_uid" ("owner_uid"),*/
/*KEY "ttrss_user_entries_owner_uid_index" ("owner_uid"),*/
/*KEY "ttrss_user_entries_ref_id_index" ("ref_id"),*/
/*KEY "ttrss_user_entries_feed_id" ("feed_id"),*/
/*KEY "ttrss_user_entries_unread_idx" ("unread")*/
);

CREATE TABLE "ttrss_user_labels2" (
  "label_id" int(11) NOT NULL,
  "article_id" int(11) NOT NULL
/*KEY "label_id" ("label_id"),*/
/*KEY "article_id" ("article_id")*/
);

CREATE TABLE "ttrss_user_prefs" (
  "id" int(11) /*unsigned*/ NOT NULL /*AUTO_INCREMENT*/,
  "owner_uid" int(11) NOT NULL,
  "pref_name" varchar(250) DEFAULT NULL,
  "value" longtext NOT NULL,
  "profile" int(11) DEFAULT NULL,
  PRIMARY KEY ("id")
/*KEY "profile" ("profile"),*/
/*KEY "owner_uid" ("owner_uid"),*/
/*KEY "pref_name" ("pref_name"),*/
/*KEY "ttrss_user_prefs_owner_uid_index" ("owner_uid"),*/
/*KEY "ttrss_user_prefs_pref_name_idx" ("pref_name")*/
);

CREATE TABLE "ttrss_version" (
  "schema_version" int(11) NOT NULL
);

/*
ALTER TABLE `ttrss_access_keys`
  ADD CONSTRAINT "ttrss_access_keys_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_archived_feeds`
  ADD CONSTRAINT "ttrss_archived_feeds_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_enclosures`
  ADD CONSTRAINT "ttrss_enclosures_ibfk_1" FOREIGN KEY ("post_id") REFERENCES "ttrss_entries" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_entry_comments`
  ADD CONSTRAINT "ttrss_entry_comments_ibfk_1" FOREIGN KEY ("ref_id") REFERENCES "ttrss_entries" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_entry_comments_ibfk_2" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_error_log`
  ADD CONSTRAINT "ttrss_error_log_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE SET NULL;

ALTER TABLE `ttrss_feeds`
  ADD CONSTRAINT "ttrss_feeds_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_feeds_ibfk_2" FOREIGN KEY ("cat_id") REFERENCES "ttrss_feed_categories" ("id") ON DELETE SET NULL,
  ADD CONSTRAINT "ttrss_feeds_ibfk_3" FOREIGN KEY ("parent_feed") REFERENCES "ttrss_feeds" ("id") ON DELETE SET NULL;

ALTER TABLE `ttrss_feed_categories`
  ADD CONSTRAINT "ttrss_feed_categories_ibfk_1" FOREIGN KEY ("parent_cat") REFERENCES "ttrss_feed_categories" ("id") ON DELETE SET NULL,
  ADD CONSTRAINT "ttrss_feed_categories_ibfk_2" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_filters2`
  ADD CONSTRAINT "ttrss_filters2_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_filters2_actions`
  ADD CONSTRAINT "ttrss_filters2_actions_ibfk_1" FOREIGN KEY ("filter_id") REFERENCES "ttrss_filters2" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_filters2_actions_ibfk_2" FOREIGN KEY ("action_id") REFERENCES "ttrss_filter_actions" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_filters2_rules`
  ADD CONSTRAINT "ttrss_filters2_rules_ibfk_1" FOREIGN KEY ("filter_id") REFERENCES "ttrss_filters2" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_filters2_rules_ibfk_2" FOREIGN KEY ("filter_type") REFERENCES "ttrss_filter_types" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_filters2_rules_ibfk_3" FOREIGN KEY ("feed_id") REFERENCES "ttrss_feeds" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_filters2_rules_ibfk_4" FOREIGN KEY ("cat_id") REFERENCES "ttrss_feed_categories" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_labels2`
  ADD CONSTRAINT "ttrss_labels2_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_linked_feeds`
  ADD CONSTRAINT "ttrss_linked_feeds_ibfk_1" FOREIGN KEY ("instance_id") REFERENCES "ttrss_linked_instances" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_plugin_af_sort_bayes_categories`
  ADD CONSTRAINT "ttrss_plugin_af_sort_bayes_categories_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_plugin_af_sort_bayes_references`
  ADD CONSTRAINT "ttrss_plugin_af_sort_bayes_references_ibfk_1" FOREIGN KEY ("category_id") REFERENCES "ttrss_plugin_af_sort_bayes_categories" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_plugin_af_sort_bayes_references_ibfk_2" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_plugin_af_sort_bayes_wordfreqs`
  ADD CONSTRAINT "ttrss_plugin_af_sort_bayes_wordfreqs_ibfk_1" FOREIGN KEY ("category_id") REFERENCES "ttrss_plugin_af_sort_bayes_categories" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_plugin_af_sort_bayes_wordfreqs_ibfk_2" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_plugin_storage`
  ADD CONSTRAINT "ttrss_plugin_storage_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_prefs`
  ADD CONSTRAINT "ttrss_prefs_ibfk_1" FOREIGN KEY ("type_id") REFERENCES "ttrss_prefs_types" ("id"),
  ADD CONSTRAINT "ttrss_prefs_ibfk_2" FOREIGN KEY ("section_id") REFERENCES "ttrss_prefs_sections" ("id");

ALTER TABLE `ttrss_settings_profiles`
  ADD CONSTRAINT "ttrss_settings_profiles_ibfk_1" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_tags`
  ADD CONSTRAINT "ttrss_tags_ibfk_1" FOREIGN KEY ("post_int_id") REFERENCES "ttrss_user_entries" ("int_id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_tags_ibfk_2" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_user_entries`
  ADD CONSTRAINT "ttrss_user_entries_ibfk_1" FOREIGN KEY ("ref_id") REFERENCES "ttrss_entries" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_user_entries_ibfk_2" FOREIGN KEY ("feed_id") REFERENCES "ttrss_feeds" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_user_entries_ibfk_3" FOREIGN KEY ("orig_feed_id") REFERENCES "ttrss_archived_feeds" ("id") ON DELETE SET NULL,
  ADD CONSTRAINT "ttrss_user_entries_ibfk_4" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_user_labels2`
  ADD CONSTRAINT "ttrss_user_labels2_ibfk_1" FOREIGN KEY ("label_id") REFERENCES "ttrss_labels2" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_user_labels2_ibfk_2" FOREIGN KEY ("article_id") REFERENCES "ttrss_entries" ("id") ON DELETE CASCADE;

ALTER TABLE `ttrss_user_prefs`
  ADD CONSTRAINT "ttrss_user_prefs_ibfk_1" FOREIGN KEY ("profile") REFERENCES "ttrss_settings_profiles" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_user_prefs_ibfk_2" FOREIGN KEY ("owner_uid") REFERENCES "ttrss_users" ("id") ON DELETE CASCADE,
  ADD CONSTRAINT "ttrss_user_prefs_ibfk_3" FOREIGN KEY ("pref_name") REFERENCES "ttrss_prefs" ("pref_name") ON DELETE CASCADE;
*/
