<?php /* Smarty version Smarty-3.1.12, created on 2021-03-03 19:51:46
         compiled from "/usr/share/nginx/html/web/templates/Blog.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1976418944603fe8d2a66e62-21264738%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '955c773f72cabf08544953deac106874ec7720fc' => 
    array (
      0 => '/usr/share/nginx/html/web/templates/Blog.tpl',
      1 => 1581197815,
      2 => 'file',
    ),
    '8d6179c42396f272c2f7cadb18f21f5d055e2da1' => 
    array (
      0 => '/usr/share/nginx/html/web/templates/Main.tpl',
      1 => 1614800343,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1976418944603fe8d2a66e62-21264738',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'title' => 0,
    'keywords' => 0,
    'description' => 0,
    'robots' => 0,
    'author' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.12',
  'unifunc' => 'content_603fe8d2ae5b37_76957993',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_603fe8d2ae5b37_76957993')) {function content_603fe8d2ae5b37_76957993($_smarty_tpl) {?>

<?php $_smarty_tpl->tpl_vars['siteName'] = new Smarty_variable('CourseTable', null, 0);?>

    <?php $_smarty_tpl->tpl_vars['title'] = new Smarty_variable('The Great Firewall of Yale - CourseTable', null, 0);?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php if (isset($_smarty_tpl->tpl_vars['keywords']->value)){?><meta name="keywords" content="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['keywords']->value, ENT_QUOTES, 'UTF-8', true);?>
"><?php }?>
<?php if (isset($_smarty_tpl->tpl_vars['description']->value)){?><meta name="description" content="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['description']->value, ENT_QUOTES, 'UTF-8', true);?>
"><?php }?>
<?php if (isset($_smarty_tpl->tpl_vars['robots']->value)){?><meta name="robots" content="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['robots']->value, ENT_QUOTES, 'UTF-8', true);?>
"><?php }?>
<?php if (isset($_smarty_tpl->tpl_vars['author']->value)){?><meta name="author" content="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['author']->value, ENT_QUOTES, 'UTF-8', true);?>
"><?php }?>

    <!-- Le styles -->
    <link href="/libs/bootstrap-2.3.2/css/bootstrap.css" rel="stylesheet">
    <link href="/libs/fontawesome/css/font-awesome.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Fav and touch icons -->
    <!--
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/libs/bootstrap/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/libs/bootstrap/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/libs/bootstrap/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="/libs/bootstrap/ico/apple-touch-icon-57-precomposed.png">
    -->
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="shortcut icon" href="/favicon.png">

    <!-- analytics -->
    <script async defer data-website-id="c5761971-088c-47ee-911c-2d5429fd651d" src="https://umami.coursetable.com/umami.js"></script>


    
    <style>
        body {
            background-color: #222;
        }
        #fixed-center {
            margin: 50px auto;
            width: 800px;
            background-color: #fff;
            opacity: 0.9;
			font-size: 16px;
			line-height: 1.5;

            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;

            z-index: 2;
        }
		#fixed-center h1 {
			font-family: YaleDesign, Garamond, 'Palatino Linotype', Palatino, Bookman, serif;
			color: #fff;
			background: #445;
			margin: 0;
			font-weight: normal;
			padding: 20px;

			border-radius: 10px 10px 0 0;
            -webkit-border-radius: 10px 10px 0 0;
            -moz-border-radius: 10px 10px 0 0;
		}
		#fixed-center-inner {
			padding: 10px 20px 20px;
		}
        body {
			/*
            background: url(/res/saybrook.jpg) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
			*/
        }

        #background {
            position: fixed;
            width: 100%;
            height: 100%;
            filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/res/saybrook.jpg', sizingMethod='scale');
            -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/res/saybrook.jpg', sizingMethod='scale')";
        }

        .not-tester-alert, .continue-btn {
            display: none;
        }

        .force-inline {
            display: inline !important;
        }

        .force-block {
            display: block !important;
        }

        .force-hide {
            display: none !important;
        }
    </style>
    


</head>

<body>



<div id="background">
</div>

<div id="fixed-center">
	<h1 class="splash-title">The Great Firewall of Yale</h1>
	<div id="fixed-center-inner">
		<h3>Yale Censors Student-Made Course Listing Website</h3>

		<p><strong>Update (2014-01-17 3:06PM EST):</strong> <a href="/recommendations.htm">We've posted a summary and recommendations for the university.</a></p>
		
		<h4>Related coverage</h4>
		<ul>
			<li><a href="http://yaledailynews.com/blog/2014/01/14/yale-shuts-down-yale-bluebook/">An article in the Yale Daily News</a></li>
			<li><a href="http://www.washingtonpost.com/blogs/the-switch/wp/2014/01/16/yale-students-made-a-better-version-of-its-course-catalog-then-yale-shut-it-down/">An early article in the Washington Post</a></li>
			<li><a href="http://www.nytimes.com/2014/01/22/nyregion/yale-students-tangle-with-university-over-yale-blue-book-website.html?_r=0">A later article in the New York Times summarizing the situation</a></li>
		</ul>

		<h4>Original article (January 13, 2014)</h4>
		<p><strong>Yalies, please support us by <a href="http://petition.yaleplus.com">signing a petition asking Yale to bring CourseTable back</a></strong></p>

		<p>You cannot see this page if you're at Yale University. Instead, you would get this message:</p>

		<img src="blocked.png" alt="&quot;To help guard against malicious activity on the Yale networks, access to the web page you were trying to visit has been blocked in accordance with Yale policy.

		If you have any questions or believe you have received this message in error, please contact your local support provider or the ITS Help Desk at 203-432-9000 or helpdesk@yale.edu. Visit the ITS website to learn more.&quot;">

		<p>"But aha!" you would say, "there must be some sort of malware!"</p>

		<p>The contents of the page is in fact, a listing of courses much more usable than the official one at <a href="http://yale.edu/oci">Yale OCI</a>. The page loads once, and searching for courses and viewing course descriptions happen instantly as the data is all pre-downloaded.</p>

		<img src="newscreenshot.png" alt="The blocked website">
		<br>
		<br>
		<p><strong>Over 2,000 students out of a campus of 5,000 were using it as of today noon, when the Yale administration began blocking it using traffic inspection</strong>. They had contacted us warning that we were using copyrighted data. Another reason cited was that it let students see the averaged evaluations far too easily. Over this time, we were negotiating, and addressed or were willing to address most of Yale's concerns, and that Yale would not disrupt its students' lives. None of their communications up through Sunday night suggested otherwise. However, rather than shutting it down directly, they did something very different.</p>

		<p><strong>Starting Friday evening, Yale started blocking the IP addresses on which the site was hosted.</strong></p>

		<p><strong>Starting Monday at noon, Yale started using TCP-layer inspection</strong> to block access to the site, showing the above message. Pings from the Yale network still could reach the servers, but when the site is accessed from a browser (on port 80), the error message shows. When the site was blocked, 2,000 students no longer had any idea of the courses they wanted to take. They had to go back to using OCI.</p>

		<p><strong>Universities are a bastion of free speech.</strong> Yale purports to be <a href="http://admissions.yale.edu/bulldogs-blogs/michelle/2012/02/13/what-we-mean-undergraduate-focus" rel="nofollow">&quot;focused on their undergraduate students&quot;</a>. Yale has made great efforts to <a href="http://yaledailynews.com/blog/2013/09/18/2-5-million-fund-to-spur-innovation-at-yei/">encourage</a> <a href="http://ceid.yale.edu/">innovation</a>. And finally, students who pay <a href="http://admissions.yale.edu/faq/what-current-tuition-yale">$58,600</a> to attend an institution should be given the information that lets them take the best classes. But actions speak louder than words, and Yale doesn't seem to think so.</p>

		<p>And blocking the website invisibly, first by IP address, and now by calling it "malicious activity", is wrong. <strong>It threatens the very basis of academic freedom and net neutrality</strong>, and it disappoints us very much to have an institution we love let us down. Deans Marichal Gentry and Mary Miller, traditionally seen as champions of the students, both have been involved in shutting down the site, along with the registrar Gabriel Olszewski. We hope that Yale will reverse its decision, and support innovation by students, for students.</p>

		<p><strong>Yale students, if you support us, please take a moment and sign <a href="http://petition.yaleplus.com">a petition to bring back CourseTable</a></strong></p>

		<p>For further comment, please email <a href="mailto:coursetableyale@gmail.com">Peter Xu and Harry Yu at coursetableyale@gmail.com</a></p>

		<p><strong>Update (2014-01-16 7:38PM EST):</strong> We'd talked to a few more faculty and non-Dean's-office administrators about this, and are <strong>now in contact and cooperating with the Yale administration</strong>. We think that Yale generally supports innovation. <strong>Yale as a whole remains a great place for technology, but moreover, Yale has prepared us not only as programmers and designers, but also as activists and citizens.</strong></p>

		<p>However, as in any large administration, things move slowly, and they panicked a little. Nevertheless, we believe that they have good intentions, and are in talks to restore the service.</p>

		<p>More generally though, there's a lesson here for other universities too. First, institutions must be less cautious and skeptical about innovation that's not explicitly sanctioned. Second, Yale and other universities should consider students more carefully when they make their decisions. If Yale had chosen to work with us after the start of the semester instead of shutting the site down immediately, none of this would have happened. Faced with aging IT systems, students will take the charge to make their own lives easier. Our anecdote can warn other universities of what not to do.</p>

	</div>
</div>


<!-- Le javascript
        ================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
<script src="/libs/bootstrap-2.3.2/js/bootstrap.js"></script>
<script src="/js/fb.js"></script>




<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-53419058-1', 'auto');
  ga('send', 'pageview');

</script>


</body>
</html>
<?php }} ?>