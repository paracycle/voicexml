'use strict';

const Nodes = require('.');

const NODES = {
	// VoiceNodes Tags
	[Nodes.Assign.TAG_NAME]: Nodes.Assign,
	[Nodes.Block.TAG_NAME]: Nodes.Block,
	// [Nodes.Catch.TAG_NAME]: Nodes.Catch,
	// [Nodes.Choice.TAG_NAME]: Nodes.Choice,
	// [Nodes.Clear.TAG_NAME]: Nodes.Clear,
	// [Nodes.Data.TAG_NAME]: Nodes.Data,
	// [Nodes.Disconnect.TAG_NAME]: Nodes.Disconnect,
	// [Nodes.Else.TAG_NAME]: Nodes.Else,
	// [Nodes.Elseif.TAG_NAME]: Nodes.Elseif,
	// [Nodes.Enumerate.TAG_NAME]: Nodes.Enumerate,
	// [Nodes.ErrorTag.TAG_NAME]: Nodes.Org,
	// [Nodes.Exit.TAG_NAME]: Nodes.Exit,
	// [Nodes.Field.TAG_NAME]: Nodes.Field,
	// [Nodes.Filled.TAG_NAME]: Nodes.Filled,
	[Nodes.Form.TAG_NAME]: Nodes.Form,
	// [Nodes.Foreach.TAG_NAME]: Nodes.Foreach,
	[Nodes.Goto.TAG_NAME]: Nodes.Goto,
	// [Nodes.Grammar.TAG_NAME]: Nodes.Grammar,
	// [Nodes.Help.TAG_NAME]: Nodes.Help,
	// [Nodes.If.TAG_NAME]: Nodes.If,
	// [Nodes.Initial.TAG_NAME]: Nodes.Initial,
	// [Nodes.Link.TAG_NAME]: Nodes.Link,
	// [Nodes.Log.TAG_NAME]: Nodes.Log,
	// [Nodes.Menu.TAG_NAME]: Nodes.Menu,
	// [Nodes.Meta.TAG_NAME]: Nodes.Meta,
	// [Nodes.Metadata.TAG_NAME]: Nodes.Metadata,
	// [Nodes.Noinput.TAG_NAME]: Nodes.Noinput,
	// [Nodes.Nomatch.TAG_NAME]: Nodes.Nomatch,
	// [Nodes.ObjectTag.TAG_NAME]: Nodes.Objecttag,
	// [Nodes.Option.TAG_NAME]: Nodes.Option,
	// [Nodes.Param.TAG_NAME]: Nodes.Param,
	[Nodes.Prompt.TAG_NAME]: Nodes.Prompt,
	// [Nodes.Property.TAG_NAME]: Nodes.Property,
	// [Nodes.Record.TAG_NAME]: Nodes.Record,
	// [Nodes.Reprompt.TAG_NAME]: Nodes.Reprompt,
	// [Nodes.Return.TAG_NAME]: Nodes.Return,
	[Nodes.Script.TAG_NAME]: Nodes.Script,
	// [Nodes.Subdialog.TAG_NAME]: Nodes.Subdialog,
	// [Nodes.Submit.TAG_NAME]: Nodes.Submit,
	// [Nodes.Throw.TAG_NAME]: Nodes.Throw,
	// [Nodes.Transfer.TAG_NAME]: Nodes.Transfer,
	[Nodes.Value.TAG_NAME]: Nodes.Value,
	[Nodes.Var.TAG_NAME]: Nodes.Var,
	[Nodes.Vxml.TAG_NAME]: Nodes.Vxml,
	// // SSML Tags
	// [Nodes.Audio.TAG_NAME]: Nodes.Audio,
	// [Nodes.Break.TAG_NAME]: Nodes.Break,
	// [Nodes.Desc.TAG_NAME]: Nodes.Desc,
	// [Nodes.Emphasis.TAG_NAME]: Nodes.Emphasis,
	// [Nodes.Lexicon.TAG_NAME]: Nodes.Lexicon,
	// [Nodes.Mark.TAG_NAME]: Nodes.Mark,
	// [Nodes.P.TAG_NAME]: Nodes.P,
	// [Nodes.Phoneme.TAG_NAME]: Nodes.Phoneme,
	// [Nodes.Prosody.TAG_NAME]: Nodes.Prosody,
	// [Nodes.S.TAG_NAME]: Nodes.S,
	// [Nodes.Sayas.TAG_NAME]: Nodes.Sayas,
	// [Nodes.Sub.TAG_NAME]: Nodes.Sub,
	// [Nodes.Voice.TAG_NAME]: Nodes.Voice,
	// // SRGS Tags
	// [Nodes.Example.TAG_NAME]: Nodes.Example,
	// [Nodes.Item.TAG_NAME]: Nodes.Item,
	// [Nodes.Oneof.TAG_NAME]: Nodes.Oneof,
	// [Nodes.Rule.TAG_NAME]: Nodes.Rule,
	// [Nodes.Ruleref.TAG_NAME]: Nodes.Ruleref,
	// [Nodes.Tag.TAG_NAME]: Nodes.Tag,
	// [Nodes.Token.TAG_NAME]: Nodes.Token,
	// // Generic XML Tags
	[Nodes.Text.TAG_NAME]: Nodes.Text,
}

module.exports = function nodeBuilder(node) {
	const className = NODES[node.name()];

	if (!className) {
		// @todo convert to some typed error
		throw new Error(`unknown voicexml node '${ node.name() }'`);
	}

	return new className(node, node.childNodes().map(nodeBuilder));
}

