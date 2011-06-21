importPackage( Packages.com.openedit.util );
importPackage( Packages.java.util );
importPackage( Packages.java.lang );
importPackage( Packages.com.openedit.modules.update );

var zip = "http://dev.entermediasoftware.com/jenkins/job/app-eml/lastSuccessfulBuild/artifact/deploy/app-eml.zip";

var root = moduleManager.getBean("root").getAbsolutePath();
var eml = root + "/eml";
var tmp = root + "/WEB-INF/tmp";

log.add("1. GET THE LATEST ZIP FILE");
var downloader = new Downloader();
downloader.download( war, tmp + "/eml.zip");

log.add("2. UNZIP WAR FILE");
var unziper = new ZipUtil();
unziper.unzip(  tmp + "/eml.zip",  tmp );

var files = new FileUtils();
log.add("4. UPGRADE BASE DIR");
files.deleteAll( root + "/eml");
files.copyFiles( tmp + "/eml", root);

log.add("5. CLEAN UP");
files.deleteAll(tmp);

log.add("6. UPGRADE COMPLETED");